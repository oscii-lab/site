~ show: none
~ title: Lexicon Demo
~ byline: none
~ body: dark blue

<block styles>
<link href="assets/styles/lexicon.css" rel="stylesheet" media="screen">
</block styles>

<block content>
<section class="lex-header col-md-12">
<div class="lex-logo col-md-3"><img src="assets/images/logo-blue-white.png"></div>
<form class="lex-form col-md-8" action="results.html">
    <input class="lex-input" placeholder="search term" value="" id="search" name="word">
    <!--<p class="lex-byline col-md-12">(n.) One who commands, leads, or guides others, especially <span class="lex-source">- duckduckgo.com</span></p>-->
</form>
</section>
<!--<nav class="lex-nav col-md-12">
<ul>
<li><a href="#" class="focus"><span class="no">1</span>Osciigon</a></li>
<li><a href="#"><span class="no">2</span>Example Clusters</a></li>
<li><a href="#"><span class="no">3</span>Morpheme Relationships</a></li>
</ul>
</nav>-->
<section class="page-content col-md-12">
<div class='result-container'>
<p>Loading...</p></div>
</section>
</block content>

<block dependencies>
<script type='text/javascript' src='https://code.jquery.com/ui/1.11.3/jquery-ui.js'></script>
<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.3.1/lodash.js'></script>
<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/async/0.9.0/async.js'></script>
<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['sankey']}]}"></script>
<script type='text/javascript' src='assets/scripts/lexicon.js'></script>
</block dependencies>
