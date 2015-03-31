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
        maxCount: 6,
        minFrequency: 0
      }, function(response) {
        if (response.translations.length <= 0) return callback("No results");
        links = _.map(response.translations, function(translation) {
          return { source: query, score: translation.frequency + 1e-3, target: translation.target + " " };
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
          maxCount: 3
        }, function(response) {
          if (response.translations.length > 0) {
            _.each(response.translations, function(translation) {
              if (translation.translation !== query) {
                links.push({ source: q + " ", score: translation.frequency + 1e-3, target: translation.target + "  " });
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
      $('html, body').animate({scrollTop: $('#search').offset().top });
    }
  });
}

function drawChart(links) {
  var sorted = _.sortBy(links, function(link) { return link.score });
  var data = _.map(sorted, function(link) {
    return [link.source, link.target, link.score];
  });
  var table = new google.visualization.DataTable();
  table.addColumn('string', 'English');
  table.addColumn('string', 'Spanish');
  table.addColumn('number', 'Weight');
  table.addRows(data);
  var options = {
    height: 300,
    width: 600,
    sankey: {
      link: {
        color: {
          fill: '#f2b50f',
          fillOpacity: 0.6
        }
      },
      node: {
        label: {
          fontSize: 14
        },
        width: 4,
      }
    }
  };
  var chart = new google.visualization.Sankey($('.result-container').get(0));
  chart.draw(table, options);
}

function extend(query, callback) {
  var request = {query: query, source: 'en', target: 'es', extend: true, maxCount: 6}
  $.getJSON(endpoint, request, function(response) {
    callback(response.extensions);
  });
}

$(document).ready(function() {
  var searchBox = $('#search');
  searchBox.autocomplete({
    source: function(request, response) {
      extend(request.term, response);
    },
    select: function(event, ui) {
      searchBox.autocomplete("close");
      retranslate(ui.item.value);
    }
  });
  searchBox.on('keyup', function() {
    retranslate($('#search').val());
  });
  searchBox.keypress(function(e) {
    if (e.which == 13) {
      searchBox.autocomplete("close");
    }
  });
});
