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
    geOrchestraBaseUrl: 'https:\/\/public.sig.rennesmetropole.fr/',
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
//    openLSGeocodeUrl: "http://gpp3-wxs.ign.fr/[CLEF GEOPORTAIL]/geoportail/ols?",
    /**
     * background layers (EPSG:3857)
     */
    layersBackground: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https:\/\/public.sig.rennesmetropole.fr/geoserver/wms',
                params: {
                    'LAYERS': 'ref_fonds:pvci',
                    'TILED': true
                },
                extent: [-227718,6091011,-154186,6160110],
                attributions: [new ol.Attribution({ html: 'tiles from geOrchestra, data <a href="https:\/\/public.sig.rennesmetropole.fr/">(c) Rennes Metropole</a>'})],
            })
        }),
	 new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https:\/\/public.sig.rennesmetropole.fr/geoserver/wms',
                params: {
                    'LAYERS': 'ref_fonds:pvci_simple_gris',
                    'TILED': true
                },
                extent: [-227718,6091011,-154186,6160110],
                attributions: [new ol.Attribution({ html: 'tiles from geOrchestra, data <a href="https:\/\/public.sig.rennesmetropole.fr/">(c) Rennes Metropole</a>'})],
            })
        }),

        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https:\/\/public.sig.rennesmetropole.fr/geoserver/wms',
                params: {
                    'LAYERS': 'raster:ortho2017',
                    'TILED': true
                },
                extent: [-227718,6091011,-154186,6160110],
                attributions: [new ol.Attribution({ html: 'tiles from geOrchestra, data <a href="https:\/\/public.sig.rennesmetropole.fr/">(c) Rennes Metropole</a>'})],
            })
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https:\/\/public.sig.rennesmetropole.fr/geoserver/wms',
                params: {
                    'LAYERS': 'ref_cad:cadastre',
                    'TILED': true
                },
                extent: [-227718,6091011,-154186,6160110],
                attributions: [new ol.Attribution({ html: 'tiles from geOrchestra, data <a href="https:\/\/public.sig.rennesmetropole.fr/">(c) Rennes Metropole</a>'})],
            })
        }),
	 new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'https:\/\/public.sig.rennesmetropole.fr/geoserver/wms',
                params: {
                    'LAYERS': 'ref_fonds:pvci_nb',
                    'TILED': true
                },
                extent: [-227718,6091011,-154186,6160110],
                attributions: [new ol.Attribution({ html: 'tiles from geOrchestra, data <a href="https:\/\/public.sig.rennesmetropole.fr/">(c) Rennes Metropole</a>'})],
            })
        })

    ],
	  wmtsBackgroundLayers: [
        {
            name : "ref_fonds:pvci",
            pictureType: "png"
        },
        {
            name: "ref_fonds:pvci_simple_gris",
            pictureType: "png"
        },
        {
            name: "raster:ortho2017",
            pictureType: "jpeg"
        },
        {
            name: "ref_cad:cadastre",
            pictureType: "png"
        },
	{
            name: "ref_fonds:pvci_nb", 
            pictureType: "png"
        }
    ],
     /**
     * social media links (prefixes)
     */
    socialMedia: {
        'Twitter' : 'https://twitter.com/intent/tweet?text=',
        'Facebook': 'http://www.facebook.com/sharer/sharer.php?u='
    }
};

$("#panelQueryBtn").css('display','none'); // masque l'affichage de la fiche d'information
$("#panelShareBtn").css('display','none'); // masque le menu  de partage
$("#panelInfoBtn").css('display','none'); // masque l'affichage de la légende
$("#panelLocateBtn").css('display','none'); //  masque la fonctionnalitée de recherche d'adresse
$(".ui-icon-plus-c").css('display','none'); //  masque le boutton de zoom (loupe +)
$(".ui-icon-minus-c").css('display','none'); //  masque le boutton de dezoom (loupe -)
$(".ui-icon-layer-c").css('display','none'); // masque le boutton d'affichage des fonds de plan (carte)
$(".ui-icon-home-c").css('display','none'); // masque le bouton d'affichage de la vue initiale (maison)

