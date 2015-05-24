~ show: none
~ title: Lexicon Demo
~ byline: none

<block styles>
<link href="assets/lexicon.css" rel="stylesheet" media="screen">
</block styles>

<block content>
<section>
    <div class="index-logo"><img src="assets/images/logo-blue.png"></div>
    <h1 class="index-title">Oscii Lab</h1>
    <form class="index-form">
        <input class="index-input" id="search" >
    </form>
    <p class="index-byline">type in a word above, to learn more about words you thought you knew</p>
    <div class='result-container'></div>
</section>
</block content>

<block dependencies>
<script type='text/javascript' src='https://code.jquery.com/ui/1.11.3/jquery-ui.js'></script>
<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.3.1/lodash.js'></script>
<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/async/0.9.0/async.js'></script>
<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['sankey']}]}"></script>
<script type='text/javascript' src='assets/lexicon.js'></script>
</block dependencies>
