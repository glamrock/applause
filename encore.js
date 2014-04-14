var CensorshipMeter = new Object();
CensorshipMeter.baseUrl = "\/\/encore.noise.gatech.edu/submit";
CensorshipMeter.measurementId = encodeURIComponent("3b854b200df859a2");
CensorshipMeter.submitResult = function (state) {
    this.submitted = state;
    $.ajax({
        url: this.baseUrl + "?cmh-id=" + this.measurementId + "&cmh-result=" + encodeURIComponent(state),
    });
}
CensorshipMeter.sendSuccess = function () {
    this.submitResult("success");
}
CensorshipMeter.sendFailure = function () {
    this.submitResult("failure");
}
CensorshipMeter.setupStats = function () {
    this.logo = $("#encore-stats");
    if (typeof this.logo == "undefined") {
        return;
    }
    this.logo.html('Visitors of this page automatically measure Web filtering. <a href="\/\/encore.noise.gatech.edu/stats/refer">Learn more</a>.');
}
CensorshipMeter.run = function () {
    this.submitResult("init");
    $(function () {
        CensorshipMeter.measure();
    });
    $(function () {
        CensorshipMeter.setupStats();
    });
}
CensorshipMeter.measure = function () {
    var img = $('<img>');
    img.attr('src', 'http:\/\/www.heyugly.org\/favicon.ico');
    img.attr('style', 'display: none');
    img.attr('onload', 'CensorshipMeter.sendSuccess()');
    img.attr('onerror', 'CensorshipMeter.sendFailure()');
    img.appendTo('html');
}
CensorshipMeter.loadJQuery = function () {
    var headTag = document.getElementsByTagName('head')[0];
    var jqTag = document.createElement('script');
    jqTag.type = 'text/javascript';
    jqTag.src = '\/\/encore.noise.gatech.edu/jquery.js';
    jqTag.onload = function () {
        CensorshipMeter.run();
    }
    headTag.appendChild(jqTag);
}
if (typeof jQuery == "undefined") {
    CensorshipMeter.loadJQuery();
} else {
    CensorshipMeter.run();
}