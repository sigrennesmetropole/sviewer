customConfig = {
    title: 'geOrchestra mobile',
    /**
     * force default language, see etc/i18n.js
     */
    // lang: 'fr',
    /**
     * base url of the geOrchetra SDI. Layers coming from this SDI
     * will have enhanced features.
     */
    geOrchestraBaseUrl: 'https://public-test.sig.rennesmetropole.fr/',

     /**
     * projection
     */
    projcode: 'EPSG:3857',
    /**
     * map bounds
     * x min, y min, x max, y max
     */
    initialExtent: [-227718,6091011,-154186,6160110],
    maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
    restrictedExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
    /**
     * getFeatureInfo control
     */
    maxFeatures: 10,
    nodata: '<!--nodatadetect-->\n<!--nodatadetect-->',
    /**
     * openLS control
     */
    //openLSGeocodeUrl: "http://gpp3-wxs.ign.fr/k2xvhwe59kdc10i3lepsh374/geoportail/ols?",
    //openLSGeocodeUrl: "https:\/\/wxs.ign.fr/k2xvhwe59kdc10i3lepsh374/geoportail/ols?",
    //openLSGeocodeUrl: 'http://wxs.ign.fr/k2xvhwe59kdc10i3lepsh374/autoconf/?keys=k2xvhwe59kdc10i3lepsh374',
    //openLSGeocodeUrl: 'http://wxs.ign.fr/k2xvhwe59kdc10i3lepsh374/ols/api/completion?',
 
    /**
     * background layers (EPSG:3857)
     */
    wmtsBackgroundLayersNames: "ref_fonds:pvci,ref_fonds:pvci_simple_gris,raster:ortho2017,ref_cad:cadastre",
    /**
     * social media links (prefixes)
     */
    socialMedia: {
        'Twitter' : 'https:\/\/twitter.com/intent/tweet?text=',
        'Facebook': 'http:\/\/www.facebook.com/sharer/sharer.php?u='
    }
};
