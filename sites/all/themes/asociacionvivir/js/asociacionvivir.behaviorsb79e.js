(function ($) {

    /**
     * The recommended way for producing HTML markup through JavaScript is to write
     * theming functions. These are similiar to the theming functions that you might
     * know from 'phptemplate' (the default PHP templating engine used by most
     * Drupal themes including Omega). JavaScript theme functions accept arguments
     * and can be overriden by sub-themes.
     *
     * In most cases, there is no good reason to NOT wrap your markup producing
     * JavaScript in a theme function.
     */
    Drupal.theme.prototype.asociacionvivirExampleButton = function (path, title) {
        // Create an anchor element with jQuery.
        return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
    };

    /**
     * Behaviors are Drupal's way of applying JavaScript to a page. In short, the
     * advantage of Behaviors over a simple 'document.ready()' lies in how it
     * interacts with content loaded through Ajax. Opposed to the
     * 'document.ready()' event which is only fired once when the page is
     * initially loaded, behaviors get re-executed whenever something is added to
     * the page through Ajax.
     *
     * You can attach as many behaviors as you wish. In fact, instead of overloading
     * a single behavior with multiple, completely unrelated tasks you should create
     * a separate behavior for every separate task.
     *
     * In most cases, there is no good reason to NOT wrap your JavaScript code in a
     * behavior.
     *
     * @param context
     *   The context for which the behavior is being executed. This is either the
     *   full page or a piece of HTML that was just added through Ajax.
     * @param settings
     *   An array of settings (added through drupal_add_js()). Instead of accessing
     *   Drupal.settings directly you should use this because of potential
     *   modifications made by the Ajax callback that also produced 'context'.
     */
    Drupal.behaviors.asociacionvivirExampleBehavior = {
        attach: function (context, settings) {
            // By using the 'context' variable we make sure that our code only runs on
            // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
            // we don't run the same piece of code for an HTML snippet that we already
            // processed previously. By using .once('foo') all processed elements will
            // get tagged with a 'foo-processed' class, causing all future invocations
            // of this behavior to ignore them.
            $('.some-selector', context).once('foo', function () {
                // Now, we are invoking the previously declared theme function using two
                // settings as arguments.
                var $anchor = Drupal.theme('asociacionvivirExampleButton', settings.myExampleLinkPath, settings.myExampleLinkTitle);

                // The anchor is then appended to the current element.
                $anchor.appendTo(this);
            });
        }
    };

    $.fn.triangle = function (options) {
        var defaults = {
            leftHeight: 30, //height of top triangle 
            offset: 0, //width + offset in top trinagle
            rightWidth: 55, //width of right triangle
            breakpoint: 944, //hide the right triangle 
            tRight: false //show the right triangle
            //color: color of triangle
            //target: element with triangle on top
        }
        var options = $.extend(defaults, options);
        var cssCommon = {
            'background': 'transparent',
            'border-style': 'solid',
            '-moz-transform': 'scale(.9999)',
            'width': 10,
            'height': 2,
            'position': 'absolute',
            'z-index': 50
        };
        this.each(function () {
            var o = options;
            var el = $(this);
            var color = o.color ? o.color : el.css('background-color');
            var target = o.target ? o.target : el;

            el.prepend('<div id="triangle_right"></div>');
            el.prepend('<div id="triangle_top"></div>');

            var draw = function () {
                var elWidth = el.outerWidth();
                var elHeight = el.outerHeight();
                var elPaddingTop = parseInt(el.css('padding-top').replace("px", ""));
                var elPaddingLeft = parseInt(el.css('padding-left').replace("px", ""));

                if ($(window).outerWidth() < o.breakpoint) {
                    display = 'none';
                    offset = 0;
                } else {
                    display = 'inherit';
                    offset = o.offset + o.rightWidth;
                }

                if (o.tRight) {
                    var e_right = $("#triangle_right", el).css(cssCommon)
                            .css({
                                'border-color': color + ' transparent transparent transparent',
                                'border-width': elHeight + 'px ' + o.rightWidth + 'px 0px 0px',
                                'margin-top': '-' + (elPaddingTop) + 'px',
                                'margin-left': elWidth - elPaddingLeft - 10 + 'px',
                                'display': display
                            });
                }
                ;

                var e_top = $("#triangle_top", el).css(cssCommon)
                        .css({
                            'border-color': 'transparent transparent transparent ' + color,
                            'border-width': o.leftHeight + 'px 0px 0px ' + (elWidth + o.offset + offset) + 'px',
                            'margin-top': '-' + (o.leftHeight + elPaddingTop) + 'px',
                            'margin-left': '-' + elPaddingLeft + 'px'
                        });
            }

            $(window).resize(draw);
            draw();
            return el;
        });
    };

    $.fn.closeButton = function (options) {
        var o = $.extend(options);
        this.each(function () {
            var el = $(this);
            var ref = $(o.ref);
            var position = function () {
                var ref_top = ref.offset().top - parseInt(ref.css('padding-top').replace("px", "")) - o.offset;
                el.css({
                    'position': 'absolute',
                    'top': ref_top,
                    'z-index': 100,
                });
            }
            $(window).resize(position);
            position();
            return el;
        });
    };

    $.fn.adjustImage = function (options) {
        var options = $.extend(options);
        this.each(function () {
            var o = options;
            var el = $(this);
            var ref = $(o.ref);
            var img = $("img", el);
            var imgParent = img.parent().css({
                'overflow': 'hidden'
            });

            var center = function () {
                el.height(0);
                var refHeight = ref.outerHeight();
                el.height(refHeight + 1);
                //make image wrap to have the same height than the ref object                
                img.css({
                    'height': refHeight + 2,
                    'width': 'auto'
                });
                //Check that the width of image >= wrapper
                if (img.outerWidth() < el.outerWidth()) {
                    img.css({
                        'height': 'auto',
                        'width': el.outerWidth() + 2
                    });
                }
                //center the image
                if ($(window).outerWidth() > 959) { //mobile breakpoint in 960px
                    var offsetLeft = (el.outerWidth() - img.outerWidth()) / 2;
                    offsetLeft = offsetLeft < 0 ? offsetLeft : 0;
                    var offsetTop = (el.outerHeight() - img.outerHeight()) / 2;
                    offsetTop = offsetTop > 0 ? offsetTop : 0;
                    img.css({
                        'margin-top': -offsetTop,
                        'margin-left': offsetLeft
                    }); 
                }
            }
            $(window).resize(center);
            center(); 
            return el;
        });
    };
    
    function map() { //-0.2115,-78.4146667
        var markerPos = $(".node-type-como-llegar .field--name-field-marker-position .field__item").text();
        var markerPosLat = parseFloat(markerPos.split(',')[0]);
        var markerPosLong = parseFloat(markerPos.split(',')[1]);
        var mapZoom = parseInt($(".node-type-como-llegar .field--name-field-map-zoom .field__item").text());
        var horOffset = (0.0011 * $(".node-type-como-llegar .l-page").outerHeight()) / 1140;
        //console.log(markerPosLat + "/" + markerPosLong + "/" + mapZoom);
        //Create the map
        var mapCanvas = document.getElementById($('.node-type-como-llegar .map')[0].id);
        var latitude = markerPosLat, //centerPosLat, 
                longitude = markerPosLong + horOffset, //centerPosLong, 
                map_zoom = mapZoom//16;

        //google map custom marker icon - .png fallback for IE11
        var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
        var marker_url = (is_internetExplorer11) ? '/sites/all/themes/asociacionvivir/images/map-selector.png' : '/sites/all/themes/asociacionvivir/images/map-selector.svg';

        var map_options = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: map_zoom,
            scrollwheel: false,
            disableDefaultUI: true,
            styles: [{
                stylers: [{
                    saturation: -100
                }]
             }]
        }

        var map = new google.maps.Map(mapCanvas, map_options);

        var marker = new google.maps.Marker({
            position: {lat: markerPosLat, lng: markerPosLong},
            map: map,
            visible: true,
            title: 'Asociación Vivir',
            icon: marker_url,
        });

        $(window).resize(function () {
            map.panTo({lat: latitude, lng: longitude});
        });
    }
    //Shape for page Publicaciones
    function publi_triangle() {
        var offset = 54;
        var heightRef = $(".l-main").outerHeight() + offset;
        $(".node-type-publications .border-left").css('border-bottom-width', heightRef);
        $(".node-type-publications .border-right").css('border-top-width', heightRef);
        return true;
    }
    //Shape for page Contáctanos
    function contact_triangle() {
        var offset = 70;
        var heightRef = $(".l-main").outerHeight() + offset;
        $(".node-type-contactanos .bg-left-panel").css('border-bottom-width', heightRef);
        $(".node-type-contactanos .bg-right-panel").css('border-top-width', heightRef);
        return true;
    }
    
    function homepage() {
        var panelsContainer = $(".node-type-home-page .view-content");       
        var panels = $(".views-row", panelsContainer);
        $.each(panels, function() {
            var panel = $(this); 
            var color = $(".views-field-field-color .field-content", panel).text(); 
            var realColor = 'gray';
            switch(color) {
                case 'Orange':
                    realColor = '#F1783C';
                    break;
                case 'Blue':
                    realColor = '#3598C0';
                    break;
                case 'Ocre':
                    realColor = '#906D46';
                    break;
            } 
            panel.css('background-color', realColor); 
        });
        
       
        var initPage = $(".node-type-home-page .pane-node-field-description");
        var homePage = $(".node-type-home-page .pane-home-page-inside");
        var verMas = $(".node-type-home-page .ver-mas").click(function(){
            transition(0);
        });
        var timeout = parseInt($('.node-type-home-page .pane-node-field-time-out').text());
        transition(timeout);
        function transition(time) {            
            setTimeout(function () {
                $(".node-type-home-page .l-page").css('margin-top', 0);
                $(".node-type-home-page .pane-custom").css('display', 'none');
                
                initPage.fadeOut("slow").css({display: "none"});
                homePage.fadeIn("slow").css({display: "inherit"});
            }, time * 1000);            
        }  
    }
    
    function equalTimelineBorders() {     
        var el = $(".node-type-event .owl-wrapper-outer");
        function setHeight() {
            var max = 0;
            $('.group-footer', el).each(function() {
                $(this).height('');
                var h = $(this).height();
                max = Math.max(max, h);
            }).height(max);
        }
        
        $(window).on('load resize orientationchange', setHeight);
    }
    
   
    $(window).resize(function () {
        publi_triangle();
    });
    
    function init () {
        $(".pane-node-field-image").adjustImage({
            'ref': '.panel-col-first'
        });

        $(".node-type-testimonial .pane-node-content, .pane-node-field-timeline, .node-type-profile .pane-node-content").triangle({'tRight': false, 'offset': -30});

        $(".panel-col-first").triangle({'tRight': true});
        
        $('.webform-submit').click(function () {
            contact_triangle();
        });  
        
        publi_triangle();
    }
    
    $(document).ready(function () {  
        homepage();
        equalTimelineBorders();                
        map();    
        init();     
    });
    $(window).load(function() {
        $(".pane-node-field-image").adjustImage({
            'ref': '.panel-col-first'
        });  
        init();   
    });
})(jQuery);
