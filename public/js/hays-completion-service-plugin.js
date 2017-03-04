var isIE6 = /MSIE 6/i.test(navigator.userAgent);
(function(jQuery) {
    var delay;
    var html = {
        CONTAINER: 'dl',
        SUGGESTION: 'dd',
        LABEL: 'label'
    };
    var keys = {
        UP: 38,
        DOWN: 40,
        DEL: 46,
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        PAGEUP: 33,
        PAGEDOWN: 34
    };
    jQuery.fn.addHaysSuggestionService = function(settings, container) {
        var config = {
            'serviceUrl': '/twigkit/services/query-suggestion-service/',
            'serviceId': 'static-completions',
            'selectedClassName': 'selected'
        };
        if (settings) {
            jQuery.extend(config, settings);
        }
        this.each(function() {
            attach(this, container, config, false);
        });
        return this;
    }
    ;
    function attach(elem, container, config, escape) {
        var template = (escape === undefined) ? Tempo.prepare(container) : Tempo.prepare(container, {
            'escape': escape
        });
        container.css('top', jQuery(jQuery(elem)).offset().top + jQuery(elem).outerHeight() + 'px');
        container.css('left', jQuery(jQuery(elem)).offset().left + 'px');
        jQuery(elem).bind('keydown keyup', function(event) {
            var input = event.target;
            jQuery(input).blur(function(event) {
                setTimeout(function() {
                    template.clear();
                    container.hide();
                    if (!isIE6)
                        jQuery(input).removeClass('suggesting');
                }, 250);
            });
            clearTimeout(delay);
            switch (event.keyCode) {
            case keys.UP:
                if (event.type == 'keydown') {
                    event.preventDefault();
                    changeSelection(container, keys.UP, config);
                }
                return false;
            case keys.DOWN:
                if (event.type == 'keydown') {
                    event.preventDefault();
                    changeSelection(container, keys.DOWN, config);
                }
                return false;
            case keys.RETURN:
                var target = container.find(html.SUGGESTION + '.' + config.selectedClassName);
                if (event.type == 'keydown' && jQuery(target).is(':visible') && target.length > 0) {
                    event.preventDefault();
                    takeSelection(target, container, input);
                    if (!isIE6)
                        jQuery(input).removeClass('suggesting');
                    return false;
                } else {
                    return true;
                }
            case keys.ESC:
                if (event.type == 'keydown') {
                    event.preventDefault();
                    template.clear();
                    container.hide();
                    jQuery(input).removeClass('suggesting');
                }
                return false;
            default:
                if (event.type == 'keyup') {
                    if (event.target.value.length > 0) {
                        delay = setTimeout(function() {
                            if (event.target.value.length > 0) {
                                if (config.serviceId) {
                                    var url = config.serviceUrl + config.serviceId + '?q=' + encodeURIComponent(event.target.value);
                                } else {
                                    var url = config.serviceUrl + '?q=' + encodeURIComponent(event.target.value);
                                }
                                jQuery.ajax({
                                    url: url,
                                    dataType: "jsonp",
                                    success: function(data) {
                                        var list = data;
                                        var hasSuggestions = data && data.length > 0;
                                        if (config.serviceId) {
                                            list = eval(data);
                                            var hasSuggestions = false;
                                            for (var i = 0; i < list.length; i++) {
                                                if (list[i].values.length > 0) {
                                                    hasSuggestions = true;
                                                    break;
                                                }
                                            }
                                        }
                                        if (hasSuggestions) {
                                            template.render(list);
                                            if (container.children().length > 0) {
                                                jQuery(container).find(html.SUGGESTION).on('hover', function(event) {
                                                    jQuery(container).find(html.SUGGESTION).removeClass(config.selectedClassName);
                                                    jQuery(this).toggleClass(config.selectedClassName);
                                                });
                                                jQuery(container).find(html.SUGGESTION).on('click', function(event) {
                                                    jQuery(this).addClass(config.selectedClassName);
                                                    takeSelection(this, container, input);
                                                });
                                                container.show();
                                                if (!isIE6)
                                                    jQuery(input).addClass('suggesting');
                                            } else {
                                                container.remove();
                                                if (!isIE6)
                                                    jQuery(input).removeClass('suggesting');
                                            }
                                        } else {
                                            template.clear();
                                            container.hide();
                                        }
                                    }
                                });
                            }
                        }, 350);
                    } else {
                        template.clear();
                        container.hide();
                    }
                }
                return true;
            }
        });
    }
    function takeSelection(suggestion, suggestionList, input) {
        jQuery(suggestionList).hide();
        if (!isIE6)
            jQuery(suggestion).removeClass('suggesting');
        var suggestionText = jQuery(suggestion).find("a").text().replace('<em>', '').replace('</em>', '');
        $(input).val(suggestionText);
        var locationId = jQuery(suggestion).attr('data-location-id');
        if (locationId && locationId.length) {
            $('#hays-suggest-locationId').val(locationId);
        }
        var level = jQuery(suggestion).attr('data-level');
        if (level) {
            $('#hays-suggest-level').val(level);
        }
    }
    function changeSelection(suggestionList, direction, config) {
        if (jQuery(suggestionList).find(html.SUGGESTION + '.' + config.selectedClassName).length == 0) {
            jQuery(suggestionList).find(html.SUGGESTION + ':' + (direction == keys.DOWN ? 'first' : 'last')).toggleClass(config.selectedClassName);
        } else {
            if (direction == keys.UP && jQuery(suggestionList).find(html.SUGGESTION).first().hasClass(config.selectedClassName)) {
                jQuery(suggestionList).find(html.SUGGESTION).first().removeClass(config.selectedClassName);
            } else {
                if (direction == keys.DOWN && jQuery(suggestionList).find(html.SUGGESTION).last().hasClass(config.selectedClassName)) {
                    jQuery(suggestionList).find(html.SUGGESTION).last().removeClass(config.selectedClassName);
                    jQuery(suggestionList).find(html.SUGGESTION).first().toggleClass(config.selectedClassName);
                } else {
                    var elem = jQuery(suggestionList).find(html.SUGGESTION + '.' + config.selectedClassName);
                    elem.removeClass(config.selectedClassName);
                    if (direction == keys.UP) {
                        if (elem.prev(html.SUGGESTION).length == 0) {
                            elem = elem.parent().prev().find(html.SUGGESTION).last().toggleClass(config.selectedClassName);
                        } else {
                            elem.prev(html.SUGGESTION).toggleClass(config.selectedClassName);
                        }
                    } else {
                        if (elem.next(html.SUGGESTION).length == 0) {
                            elem = elem.parent().next().find(html.SUGGESTION).first().toggleClass(config.selectedClassName);
                        } else {
                            elem.next(html.SUGGESTION).toggleClass(config.selectedClassName);
                        }
                    }
                }
            }
        }
    }
})(jQuery);
function HaysSuggestionServiceRegistration() {
    jQuery('input.hays-suggest').each(function() {
        var settings = {};
        var fieldset = jQuery(this).closest('.js-searchform-fieldset');
        var container = jQuery(fieldset).find('.tempo-suggestions');
        settings['serviceId'] = jQuery(container).attr('data-service-id');
        settings['serviceUrl'] = jQuery(container).attr('data-service-url');
        jQuery(this).addHaysSuggestionService(settings, container);
    });
}
TwigkitRenderCallbacks.add("HaysSuggestionService", HaysSuggestionServiceRegistration);
