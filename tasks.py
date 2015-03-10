from invoke import run, task
import os
import shutil

published = 'published'
pages = 'pages'

def templar(html, md, out):
    out = os.path.join(published, out)
    run('templar compile {} -s {} -m -d {}'.format(html, md, out))

@task
def clean():
    patterns = [published]
    for pattern in patterns:
        run('rm -rf %s' % pattern)

@task(default=True)
def build():
    if not os.path.exists(published):
        os.mkdir(published)
    for page in os.listdir(pages):
        md = os.path.join(pages, page)
        out = os.path.splitext(page)[0] + '.html'
        templar('page.html', md, out)

    assets_dest = os.path.join(published, 'assets')
    if os.path.exists(assets_dest):
        shutil.rmtree(assets_dest)
    shutil.copytree('assets', assets_dest)

@task(build)
def serve():
    os.chdir(published)
    run('python3 -m webbrowser -t "http://localhost:8000/"')
    run('python3 -m http.server')

@task(build)
def deploy():
    pass
