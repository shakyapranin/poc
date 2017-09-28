function intallFirefoxScreenCapturingExtension() {
    InstallTrigger.install({
        'Foo': {
            // URL: 'https://addons.mozilla.org/en-US/firefox/addon/enable-screen-capturing/',
            URL: 'https://addons.mozilla.org/firefox/downloads/file/355418/enable_screen_capturing_in_firefox-1.0.006-fx.xpi?src=cb-dl-hotness',
            toString: function() {
                return this.URL;
            }
        }
    }); // The above string 'Foo' was by Muaz Khan so changes have not been made
}
