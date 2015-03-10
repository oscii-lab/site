function searchLexicon(query) {
  var links = [];
  async.waterfall([
    function(callback) {
      $.getJSON('/translate/lexicon', {
        query: query,
        source: 'en',
        target: 'es'
      }, function(response) {
        if (response.translation.length <= 0) return callback("No results");
        links = _.map(response.translation, function(translation) {
          return { source: query, score: translation.score*translation.score, target: translation.translation };
        });
        callback(null, _.pluck(response.translation, 'translation'));
      });
    },
    function(queries, callback) {
      async.map(queries, function(q, callback) {
        $.getJSON('/translate/lexicon', {
          query: q,
          source: 'es',
          target: 'en'
        }, function(response) {
          if (response.translation.length > 0) {
            _.each(response.translation, function(translation) {
              if (translation.translation !== query) {
                links.push({ target: q, score: translation.score*translation.score, source: translation.translation });
              }
            });
          }
          callback(null);
        });
      }, callback);
    }
  ], function(err) {
    if (links.length > 0) {
      drawChart(links)
    }
  });
}

function drawChart(links) {
  var data = _.map(links, function(link) {
    return [link.source, link.target, link.score];
  });
  var table = new google.visualization.DataTable();
  table.addColumn('string', 'From');
  table.addColumn('string', 'To');
  table.addColumn('number', 'Weight');
  table.addRows(data);
  var options = {
    height: 600,
    width: 600,
    sankey: {
      link: {
        color: {
          fill: '#f2b50f'
        }
      },
      node: {
        label: {
          fontFamily: 'Helvetica',
          fontSize: 14
        }
      }
    }
  };
  var chart = new google.visualization.Sankey($('.result-container').get(0));
  chart.draw(table, options);
}


$(document).ready(function() {
  $('#search').autocomplete({
    source: [
      'comet',
      'dojo',
      'galaxy',
      'map',
      'master',
      'meteor'
    ],
    select: function(event, ui) {
      searchLexicon(ui.item.value);
    }
  });
  $('#search').on('keyup', function() {
    searchLexicon($('#search').val());
  });
});
