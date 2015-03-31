var endpoint = 'http://104.197.10.176/translate/lexicon'

function retranslate(query) {
  var links = [];
  async.waterfall([
    function(callback) {
      $.getJSON(endpoint, {
        query: query,
        source: 'en',
        target: 'es',
        translate: true,
        minFrequency: .001
      }, function(response) {
        if (response.translations.length <= 0) return callback("No results");
        links = _.map(response.translations, function(translation) {
          return { source: query, score: translation.frequency, target: translation.target };
        });
        callback(null, _.pluck(response.translations, 'target'));
      });
    },
    function(queries, callback) {
      async.map(queries, function(q, callback) {
        $.getJSON(endpoint, {
          query: q,
          source: 'es',
          target: 'en',
          translate: true,
          minFrequency: .001
        }, function(response) {
          if (response.translations.length > 0) {
            _.each(response.translations, function(translation) {
              if (translation.translation !== query) {
                links.push({ target: q, score: translation.frequency, source: translation.target });
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
  table.addColumn('string', 'English');
  table.addColumn('string', 'Spanish');
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

function extend(query, callback) {
  $.getJSON(endpoint, {
        query: query,
        source: 'en',
        target: 'es',
        extend: true
      }, function(response) {
        callback(response.extensions);
      });
}

$(document).ready(function() {
  $('#search').autocomplete({
    source: function(request, response) {
      extend(request.term, response);
    },
    select: function(event, ui) {
      retranslate(ui.item.value);
    }
  });
  $('#search').on('keyup', function() {
    retranslate($('#search').val());
  });
});
