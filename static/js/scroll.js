(function() {
    var do_queue = function(queue, action) {
        for (var i = 0;i < queue.length;i++) {
            action(queue[i]);
        }
    }

    var isDayX = function(name) {
        var q = ['#q1', '#q2', '#q3'];
        if (name !== 'intro' && name !== 'ending') {
            $('.nav').hide();
            console.log('#' + name + ' .nav');
            $('#' + name + ' .nav').show();
            $('#' + name + ' .nav').css({display: 'block'});
            readAnswer(name);
        } else {
            $('.nav').fadeOut();
            var action = function(item) { $(item).fadeOut(); }
            do_queue(q, action);
        }
    }

    var readAnswer = function(name) {
        var q = ['#q1', '#q2', '#q3'];
        var url = "json/" + name + ".json";

        var action = function(item) {
            $(item).hide();
        }
        do_queue(q, action);

        $.getJSON(url, function(result) {
            $("#nav header h3 a").attr('href', result['#nav']);
            var action = function(item) {
                $(item + " div").html(result[item]);
                $(item).fadeIn();
            }
            do_queue(q, action);
            adjust();
        });
    }

    var adjust = function() {
        
        // adjust article
        var q = $('article');
        var action = function(item) {
            var window_height = $(window).height();
            var window_width = $(window).width();
            $(item).css({
                height: window_height,
                width: window_width
            });
        }

        //do_queue(q, action);

        // adjust #q$
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
