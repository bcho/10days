(function() {
    var do_queue = function(queue, action) {
        for (var i = 0;i < queue.length;i++) {
            action(queue[i]);
        }
    }

    var isDayX = function(name) {
        var q = ['#q1', '#q2', '#q3'];
        var action;
        if (name !== 'intro') {
            action = function(item) { $(item).fadeIn(); }
            do_queue(q, action);
            readAnswer(name);
        } else {
            action = function(item) { $(item).fadeOut(); }
            do_queue(q, action);
        }
    }

    var readAnswer = function(name) {
        var q = ['#q1', '#q2', '#q3'];
        var url = "json/" + name + ".json";

        $.getJSON(url, function(result) {
            $("#nav header h3 a").attr('href', result['#nav']);
            var action = function(item) {
                $(item + " div").html(result[item]);
            }
            do_queue(q, action);
            adjust();
        });
    }

    var adjust = function() {
        var q = ['#q1', '#q2', '#q3'];
        var action = function(item) {
            var h3_height = $(item + ' header h3').height();
            var item_height = $(item).height();
            var window_height = $(window).height();
            var percentage = - ((item_height - h3_height) / 
                                window_height * 100 + 1) + "%";

            $(item).css({bottom: percentage});
            $(item).hover(function() {
                $(this).css({bottom: "0%"});
            }, function() {
                $(this).css({bottom: percentage});
            });
        }

        do_queue(q, action);
    }


    $(document).ready(function() {     
        var q = ['#q1', '#q2', '#q3'];
        do_queue(q, function (item) { $(item).hide(); });
        $(window).resize(adjust);
        $('#main_content').xrhyme({
            animationTime: 800,
            navigationSelector: 'a.x_nav',
            anchorMode: true,
            easing: 'easeInOutExpo',
            wheelSpeed: 2,
            animeComplete: function() {
                current = arguments[0];

                // check if it is #intro
                isDayX(current);

            }
        }); 
    });
})();
