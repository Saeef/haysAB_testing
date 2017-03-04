$(document).ready(function() {
    $.ajax({
        url: "https://www.hays/rest/usefullinkscontent/" + siteLocale,
        dataType: "json",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        success: function(json) {
            if (json.length > 0) {
                $("#hays-useful-links").show();
                var count = 0;
                $.each(json, function(i, value) {
                    $('#useful_links').append('<li><a href="' + value.url + '" class="hays-menu-link" target="_blank">' + value.label + '</li>');
                    count = 1;
                });
                if (count == 0)
                    $("#hays-useful-links").hide();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {}
    });
    $('.hays-menu-useful-link').click(function(e) {
        $(this).toggleClass('active').next('ul').slideToggle(200);
        e.preventDefault();
    });
});
