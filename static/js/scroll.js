(function() {
    var do_queue = function(action) {
        var queue = ['#q1', '#q2', '#q3'];

        for (var i = 0;i < queue.length;i++) {
            action(queue[i]);
        }
    }

    var isDayX = function(name) {
        var action;
        if (name !== 'intro') {
            action = function(item) { $(item).fadeIn(); }
            do_queue(action);
        } else {
            action = function(item) { $(item).fadeOut(); }
            do_queue(action);
        }
    }

    var adjust = function() {
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

        do_queue(action);
    }

    $(document).ready(function() {     
        do_queue(function (item) { $(item).hide(); });
        $(window).resize(adjust);
        $('#main_content').xrhyme({
            animationTime: 800,
            navigationSelector: 'a.nav',
            anchorMode: true,
            easing: 'easeInOutExpo',
            animeComplete: function() {

                // check if it is #intro
                isDayX(arguments[0]);

                // adjust #q$ position
                adjust();
            }
        }); 
    });
})();
