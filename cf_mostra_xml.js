/*
Desenvolvido por Péricles Netto (periclesnetto@gmail.com)
CF Sistemas LTda
Curitiba - Paraná
Sintaxe: cf_mostra_xml(xml,elemento_id,pixels_identa,cor_node,cor_menos,cor_mais,cor_string,cor_inteiro,cor_float,cor_attributo,cor_atributo_valor);
*/


function cf_mostra_xml(xml_original,el,identa,cornode,cormenos,cormais,cor_string,cor_inteiro,cor_float,coratributo,coratributovalor) {

    function cf_css_insert(rule) {
        var css = document.createElement('style'); // Creates <style></style>
        css.type = 'text/css'; // Specifies the type
        if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
        else css.appendChild(document.createTextNode(rule)); // Support for the rest
        document.getElementsByTagName("head")[0].appendChild(css); // Specifies where to place the css
    }

    cf_css_insert('.cf_xml_reader_nivel                     {margin-left:  '+(identa || '30')+'px;}');
    cf_css_insert('.cf_xml_reader_node                      {color: '+(cornode || '#5e5e5e')+';}');
    cf_css_insert('.cf_xml_reader_node_abre_fecha           {cursor: pointer; position: relative; padding-left: 8px;}');
    cf_css_insert('.cf_xml_reader_fechado::before           {content:""; position: absolute; top:50%; left:2px; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);  width: 0; height: 0; border-style: solid; border-width: 8px 4px 0 4px; border-color: '+(cormais || 'blue')+' transparent transparent transparent;');
    cf_css_insert('.cf_xml_reader_aberto::before            {content:""; position: absolute; top:50%; left:2px; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);  width: 0; height: 0; border-style: solid; border-width: 0 4px 8px 4px; border-color: transparent transparent '+(cormenos || 'red')+' transparent;');
    cf_css_insert('.cf_xml_reader_node_end                  {font-style: italic;}');
    cf_css_insert('.cf_xml_reader_nodevalue                 {color: '+(cor_string || 'blue')+';}');
    cf_css_insert('.cf_xml_reader_nodevalue_inteiro         {color: '+(cor_inteiro || 'red')+';}');
    cf_css_insert('.cf_xml_reader_nodevalue_float           {color: '+(cor_float || 'blue')+';}');
    cf_css_insert('.cf_xml_reader_nodevalue_string          {color: '+(cor_string || '#4ab84a')+';}');
    cf_css_insert('.cf_xml_reader_atributo                  {color: '+(coratributo || 'red')+';}');
    cf_css_insert('.cf_xml_reader_atributo_valor            {color: '+(coratributovalor || 'purple')+';}');

    function isFloat(val) {
        var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
        if (!floatRegex.test(val))
            return false;

        val = parseFloat(val);
        if (isNaN(val))
            return false;
        return true;
    }

    function isInt(val) {
        var intRegex = /^-?\d+$/;
        if (!intRegex.test(val))
            return false;

        var intVal = parseInt(val, 10);
        return parseFloat(val) == intVal && !isNaN(intVal);
    }

    function mnode(node) {
        var xx=node.childNodes;
        var mhtml='';
        var yy=0;
        for (yy = 0; yy < xx.length; yy++) {
            nodecont++;
            mhtml += '<div class="cf_xml_reader_node cf_xml_reader_nivel">';
            if(xx[yy].childNodes[0] && xx[yy].childNodes[0].hasChildNodes()) {
                mhtml += '<span data_valor="'+nodecont+'" class="cf_xml_reader_aberto cf_xml_reader_node_abre_fecha" onclick="cf_xml_reader_abre_fecha(this,'+nodecont+');">&lt;' + xx[yy].nodeName;
            } else {
                mhtml += '<span>&lt;' + xx[yy].nodeName;
            }
            var yyy=0;
            for (yyy = 0; yyy < xx[yy].attributes.length; yyy++) {
                mhtml+= ' <span class="atributo">'+xx[yy].attributes[yyy].name+'</span>=<span class="cf_xml_reader_atributo_valor">"'+xx[yy].attributes[yyy].nodeValue+'"</span>'
            }
            mhtml+='&gt;</span>';
            if(xx[yy].childNodes[0] && xx[yy].childNodes[0].hasChildNodes()) {
                mhtml += '<div class="cf_xml_reader_node_conteudo" data_valor="'+nodecont+'" style="display:block;">';
            }
            if(xx[yy].childNodes[0]) {
                // console.log(xx[yy].childNodes[0].nodeValue,xx[yy].childNodes[0].length,xx[yy].childNodes[0].hasChildNodes());
                if(xx[yy].childNodes[0].hasChildNodes()) {
                    mhtml += mnode(xx[yy]);
                } else {

                    if(isInt(xx[yy].childNodes[0].nodeValue)) {
                        mhtml  +='<span class="cf_xml_reader_nodevalue cf_xml_reader_nodevalue_inteiro">'+ xx[yy].childNodes[0].nodeValue;
                    } else
                    if(isFloat(xx[yy].childNodes[0].nodeValue)) {
                        mhtml  +='<span class="cf_xml_reader_nodevalue cf_xml_reader_nodevalue_float">'+ xx[yy].childNodes[0].nodeValue;
                    } else {
                        mhtml  +='<span class="cf_xml_reader_nodevalue cf_xml_reader_nodevalue_string">'+ xx[yy].childNodes[0].nodeValue;
                    }

                    mhtml += '</span>';
                }
            }
            if(xx[yy].childNodes[0] && xx[yy].childNodes[0].hasChildNodes()) {
                mhtml += '</div>';
            }
            mhtml+='<span class="cf_xml_reader_node cf_xml_reader_node_end">&lt;/'+xx[yy].nodeName+'&gt;</span></div>';


        }
        return mhtml;
    }

    var xml='';
    if (typeof xml_original === 'string' || xml_original instanceof String) {
        if (window.DOMParser) {

            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xml_original, "text/xml");
            xml = xmlDoc.documentElement;

        }
        else // Internet Explorer
        {

            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.loadXML(xml_original);
            xml =  xmlDoc.documentElement;

        }
    } else {
        xml = xml_original.documentElement;
    }

    console.log(xml);
    var nodecont=1;
    var node1=xml.nodeName;
    var html='';
    html+='<div class="cf_xml_reader_node"><span>&lt;'+node1;
    if(xml.attributes.length > 0) {
        for (y = 0; y < xml.attributes.length; y++) {
            html+= ' <span class="cf_xml_reader_atributo">'+xml.attributes[y].name+'</span>=<span class="cf_xml_reader_atributo_valor">"'+xml.attributes[y].nodeValue+'"</span>'
        }
    }
    html+='&gt;</span>';
    html+=mnode(xml);
    html+='<span class="cf_xml_reader_node cf_xml_reader_node_end">&lt;/'+node1+'&gt;</div>';

    //$('#'+el).html(html);
    document.querySelector('#'+el).innerHTML=html;


/*    $('.cf_xml_reader_node_abre_fecha').click(function(){
        event.stopPropagation();
        var valor=$(this).attr('data_valor');
        if($(this).hasClass('cf_xml_reader_aberto')) {
            $(this).removeClass('cf_xml_reader_aberto').addClass('cf_xml_reader_fechado');
            $('.cf_xml_reader_node_conteudo[data_valor="'+valor+'"]').hide('');
        } else {
            $(this).removeClass('cf_xml_reader_fechado').addClass('cf_xml_reader_aberto');
            $('.cf_xml_reader_node_conteudo[data_valor="'+valor+'"]').show('');
        }
    });*/
}

function cf_xml_reader_abre_fecha(el,valor) {
    event.stopPropagation();
    console.log(el,valor);

    var box = el;

    var hasClass = function (el, cl) {
        var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
        return !!el.className.match(regex);
    };

    var addClass = function (el, cl) {
        el.className += ' ' + cl;
    };

    var removeClass = function (el, cl) {
        var regex = new RegExp('(?:\\s|^)' + cl + '(?:\\s|$)');
        el.className = el.className.replace(regex, ' ');
    };

    var toggleClass = function (el, cl) {
        hasClass(el, cl) ? removeClass(el, cl) : addClass(el, cl);

    };

    if(hasClass(box,'cf_xml_reader_aberto')) {
        removeClass(box,'cf_xml_reader_aberto');
        addClass(box,'cf_xml_reader_fechado');

        var x = document.querySelectorAll('.cf_xml_reader_node_conteudo[data_valor="'+valor+'"]');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

    } else {

        removeClass(box,'cf_xml_reader_fechado');
        addClass(box,'cf_xml_reader_aberto');
        var x = document.querySelectorAll('.cf_xml_reader_node_conteudo[data_valor="'+valor+'"]');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    }


}
