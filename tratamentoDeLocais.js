function tratarLocais(locaisArray) {
    var locais = [];
    var maringaPattern = /MARINGA|MARINGÁ|MGA|MGR/
    var saoPauloPattern = /SAO PAULO|SÃO PAULO| SP\s/
    var campinasPattern = /CAMPINAS|CPS/

    if(locaisArray.length === 0){        
        locais.push("MGA","SPO","CPS")        
    }

    for(var x = 0; x < locaisArray.length; x++){
        var current = locaisArray[x];
        if(current.match(maringaPattern)){            
            locais.push("MGA");
        }else if(current.match(saoPauloPattern)){            
            locais.push("SPO");        
        }else if(current.match(campinasPattern)){            
            locais.push("CPS");
        }
    }
    var retorno = {locais: locais}
    return retorno;
}

module.exports.tratarLocais = tratarLocais;