module.exports =function (doc, data ,year) {

    
    // console.log(data);
    let tenant = data.tenant;
    let tenancy = data.tenancy;
    let building = data.building;
    let apartment = data.apartment;
    let owner = data.owner;
    let owner_community_costs = data.ownerCommunityCosts
    let calculationResults = data.calculationResults;
    let distributor_keys = data.distributor_keys;
    let owner_community = data.owner_community;
    let sums = data.sums;
    let apartment_costs = data.apartment_costs;

    
    let setAsCost = function(number){
        let add_zeros = function(number){
            var num=number.toString();
            var arr= num.split('.');
            if(arr.length==1) num=num+'.';
            arr= num.split('.');
            if(arr[1].length==0) num=num+'00';
            else if (arr[1].length==1) num=num+'0';
            return num;
        }
        number=(Math.round(number *100) /100)
        var cost= add_zeros(number);
        return cost.replace(".", ",");
    }

    let setAsDecimal = function(number, decimal_places){
	//number= parseInt(number);
	for(let i=1; i<=decimal_places; i++){
	    number*=10;		
	}
	number=Math.round(number)
	
	for(let i=1; i<=decimal_places; i++){
	    number/=10;		
	}
	number=Math.round(number*10000)/10000;	
	return number.toString().replace(".", ",");
    }

    let now= new Date();
    let month= 1+now.getMonth();
    doc.fontSize("10");
    let x=doc.x;
    let y= doc.y;
    doc.on("pageAdded", function(){
      y=doc.y;
    });
    
    
      //Einschreiben
    doc.fontSize(10);
    doc.font("Helvetica");
    
    
    x=doc.x;
    y= doc.y;
    doc.text("Berlin, den "+ now.getUTCDate()  +"."+month + "."+now.getFullYear() , x+330, y);
    doc.text(owner.first_name + " " + owner.last_name, x, y);
    if(owner.care_of !=null) {doc.text("c/o " + owner.care_of); }
    doc.text(owner.street + " " + owner.street_nr);
    doc.text(owner.post_code + " " + owner.city);
    doc.y = doc.y+70;
    
    doc.text(tenant.first_name + " " + tenant.last_name);
    if(tenant.care_of !=null) {doc.text("c/o " + tenant.care_of); }
    doc.text(tenant.street+ " " + tenant.street_nr);
    doc.text(tenant.post_code + " " + tenant.city);
    doc.x=72
    doc.y=doc.y +50;
    doc.fontSize(9);
    y=doc.y;
    x=72;
    doc.text("Gebäude:",x,y);
    doc.text(building.street+ " " + building.street_nr,x+50,y);
    doc.text("Whg-Nr:",x+200,y);
    doc.text("WE "+apartment.apartment_indication,x+245,y);
    doc.text("Etage:",x+350,y);
    var floor;
    if(apartment.apartment_floor==0){ floor="EG"}else{floor=apartment.apartment_floor +". OG"}
    doc.text(floor,x+390,y);
    x=72;
    doc.x=72;
    doc.y+=5;
    doc.fontSize(14);
    doc.font('Helvetica-Bold');
    doc.text("Betriebskostenabrechnung für den Zeitraum 01.01."+year+ " bis 31.12."+year);
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(10).font("Helvetica").text("Sehr geehrte Mieterin, sehr geehrter Mieter,");
    doc.moveDown();
    doc.text("nachstehend erhalten Sie o.g. Betriebskostenabrechnung.")
    doc.moveDown();
    doc.text("Die im Abrechnungszeitraum angefallenen Kosten werden den in Ihrer Miete enthaltenen Vorauszahlungen gegenübergestellt. Die Abrechnungsunterlagen können Sie nach vorheriger Terminabsprache mit dem Hausverwalter einsehen.")
    doc.moveDown();
    doc.text("Die Umlage der Betriebskosten erfolgt gemäß den Vereinbarungen in Ihrem Mietvertrag unter Berücksichtigung der gesetzlichen Bestimmungen. Das sind insbesondere bei freifinanziertem sowie mit vereinbarter Förderung erstelltem Wohnraum die Betriebskostenverordnung vom 25. November 2003 sowie die gesetzlichen Bestimmungen gemäß §§ 556, 556a BGB");
    doc.moveDown();
    if(calculationResults.difference > 0){
         
      doc.font("Helvetica-Bold").text("Ihr Abrechnungsergebnis ergibt eine Nachzahlung in Höhe von " + setAsCost( calculationResults.difference ) + " €.");
      doc.moveDown();
      doc.font("Helvetica").text("Bitte überweisen Sie diesen Betrag auf das im Folgenden genannte Bankkonto innerhalb von zwei Wochen:");
      doc.moveDown();
      x=doc.x;
      y=doc.y;
      doc.font("Helvetica-Bold").text("Inhaber:",x,y);
      doc.font("Helvetica").text(owner.account_owner,x+150,y);
      y+=15;
      doc.font("Helvetica-Bold").text("IBAN:",x,y);
      doc.font("Helvetica").text(owner.iban, x+150, y);
      y+=15;
      doc.font("Helvetica-Bold").text("BIC:",x, y);
      doc.font("Helvetica").text(owner.bic,x+150, y);
      y+=15;
      doc.font("Helvetica-Bold").text("Betrag:",x, y);
      doc.font("Helvetica").text(setAsCost(calculationResults.difference)+ " €" ,x+150, y);
      y+=15;
      doc.font("Helvetica-Bold").text("Verwendungszweck:",x, y); 
      doc.font("Helvetica").text("Nachzahlung Betriebskosten "+year+" WE"+apartment.apartment_indication, x+150, y);
    }else{
      
      doc.font("Helvetica-Bold").text("Ihr Abrechnungsergebnis ergibt einen Guthaben in Höhe von " + setAsCost( calculationResults.difference * (-1) )+" €.");
      doc.font("Helvetica").text("Das Geld wird nach einer Bestätigung der Abrechnung Ihrerseits auf Ihr Konto überwiesen.");  
    
    }
    y=doc.y;
    y+=15;
    doc.y=y;
    doc.x=72;
    doc.moveDown();
    doc.text("Sie können dieser Abrechnung innerhalb von vier Wochen ab Eingang des Schreibens widersprechen.");
    doc.moveDown();
    doc.text("Mit freundlichen Grüßen")
    doc.moveDown();
    doc.text(owner.first_name + " " + owner.last_name)
    
    //Berechnungsschreiben
    
    doc.addPage();
    x=doc.x;
    y= doc.y;
    doc.text("Berlin, den "+ now.getUTCDate()  +"."+month + "."+now.getFullYear() , x+330, y);
    doc.text(owner.first_name + " " + owner.last_name, x, y);
    if(owner.care_of !=null) {doc.text("c/o " + owner.care_of); }
    doc.text(owner.street + " " + owner.street_nr);
    doc.text(owner.post_code + " " + owner.city);
    doc.y = doc.y+70;
    
    doc.text(tenant.first_name + " " + tenant.last_name);
    if(tenant.care_of !=null) {doc.text("c/o " + tenant.care_of); }
    doc.text(tenant.street+ " " + tenant.street_nr);
    doc.text(tenant.post_code + " " + tenant.city);
    
    doc.x=72
    doc.y=doc.y +50;
    doc.fontSize(9);
    y=doc.y;
    x=72;
    doc.text("Gebäude:",x,y);
    doc.text(building.street+ " " + building.street_nr,x+50,y);
    doc.text("Whg-Nr:",x+200,y);
    doc.text("WE "+apartment.apartment_indication,x+245,y);
    doc.text("Etage:",x+350,y);
    //floor;
    //if(apartment.floor==0){ floor="EG"}else{floor=apartment.floor +". OG"}
    doc.text(floor,x+390,y);
    x=72;
    doc.x=72;
    doc.y+=5;
    doc.fontSize(14);
    doc.font('Helvetica-Bold');
    doc.text("Betriebskostenabrechnung für den Zeitraum 01.01."+year+ " bis 31.12."+year);
    doc.moveDown();
    doc.fontSize(10);
    doc.text("Allgemeine Erläuterung zur Berechnung des Verteilerschlüssels:");
    doc.font('Helvetica');
    doc.text("Ihr Verteilerschlüssel ergibt sich aus dem Produkt ihres Anteils der Berechnungsgrundlage sowie dem Zeitraum der Abrechnungsperiode, die Sie beansprucht haben dividiert durch das Produkt aus der gesamten Berechnungsgrundlage und dem gesamten Zeitraum der Abrechnungsperiode");
    doc.moveDown();

    
    var writeDestKeyAndCostTable=(array)=>{
        let doc= array[0]
        let x= array[1]
        let y= array[2]
        let dest_key= array[3]
        let CostsArray= array[4]
        let calc_base= array[5]
        let calc_partial= array[6]
        let calc_unit= array[7]
        let sums= array[8]
        let counter = array[9]
        
        /*
        dest key ist der verteilerschlüssel
        calc unit ist z.B. quadratmeter oder wohneinheitens
        calc partial ist z.B. wohnungsgröße oder 1 bei wohnheinheitens
        calc base ist z.B. gesamtwohnfläche oder  anzahl wohnungen
        */
        

        //Verteilerschluessel Tabelle
        
        y=y+15;
        if(y>600) { doc.addPage(); y=doc.y;}
        x=170;
        doc.text("Berechnungsgrundlage", x, y);
        x=x+140;
        doc.text("Zeitraum", x, y);
        x=x+100;
        doc.text("Ihr Verteilerschlüssel", x, y);
        y+=20;
        x=72;
        doc.text("Gesamt", x, y);
        x=170;
        doc.text(setAsDecimal(calc_base, 2) + " " + calc_unit, x, y, {width:110, align:'right'});
        x=x+140;
        doc.text("365", x, y);
        y+=20;
        x=72;
        doc.text("Ihr Anteil", x, y);
        x=170;
        doc.text(setAsDecimal(calc_partial,2) + " " + calc_unit, x, y, {width:110, align:'right'});
        x=x+140;
        doc.text(Math.round(parseInt(tenancy.accountingPeriod)), x, y);  
        x=x+100;
        doc.text(setAsDecimal(dest_key,4), x, y);  
        doc.moveTo(150, y+20).lineTo(150, y-30).lineTo(550, y-30).stroke();
        y+=40;
        
        //table header
        doc.font('Helvetica-Bold').text("Ihre Kosten:", 72, y).font('Helvetica');
        y=y+30;
        x=72;
        doc.text("Bezeichnung", x, y);
        x+=200;
        doc.text("Gesamtkosten", x,y);
        x+=100;
        doc.text("Verteilerschlüssel", x, y);
        x+=120;
        doc.text("Ihr Anteil", x, y);
        //Table line
        y=y+15;
        doc.moveTo(72, y).lineTo(550, y).stroke();

        //table content
        for (var i=0;i<CostsArray.length;i++){
            if (doc.y<y) y=doc.y;
            y=y+15;
            x=72;
            doc.text(CostsArray[i].designation, x, y);
            if (doc.y<y) y=72;
            x+=200;
            doc.text(setAsCost(CostsArray[i].costs), x,y, {width:80, align:'right'});
            x+=100;
	    //console.log(dest_key);	    
	    //console.log(setAsDecimal(dest_key,4));
	    //console.log(typeof dest_key);
	    //console.log(typeof setAsDecimal(dest_key,4));
            doc.text(setAsDecimal(dest_key,4), x, y, {width:80, align:'right'});
            x+=100;
            doc.text(setAsCost(CostsArray[i].partial_costs), x, y, {width:80, align:'right'});
            if (doc.y<y) y=doc.y;
        }

        //Table endline
        y=y+15;
        if (doc.y<y) y=doc.y;
        doc.moveTo(72,y).lineTo(550, y).stroke();
        y+=5;
        
        //summary
        doc.text("Gesamtkosten " + counter, 72, y);
        if (doc.y<y) y=72;
        doc.text( setAsCost(sums.finalCosts), x-200,y, {width:80, align:'right'});
        doc.text( setAsCost(sums.partialCosts), x,y, {width:80, align:'right'}); 
        y=y+50;
        doc.x=72;
        doc.y=y;
    }
    let counter=0;
    if(owner_community_costs.total_living_area.length>0){
      counter++;        
      if(y>600) { doc.addPage(); y=doc.y;}
      doc.font('Helvetica-Bold').text("Berechnung des Verteilerschlüssels anhand der Wohnfläche:").font('Helvetica');
      doc.moveDown();
      x=doc.x;
      y= doc.y;
      let dataArray=[
          doc,
          x,
          y, distributor_keys.by_total_living_area,
          owner_community_costs.total_living_area,
          owner_community.total_area,
          apartment.apartment_size,
          "m²",
          sums.owner_community_costs.total_living_area,
          counter ]
      writeDestKeyAndCostTable(dataArray);
    }
        
    if(owner_community_costs.living_area_except_ground_floor.length>0){
      counter++;     
      if(y>600) { doc.addPage(); y=doc.y;}
      doc.font('Helvetica-Bold').text("Berechnung des Verteilerschlüssels anhand der Wohnfläche (Außer Erdgeschoß):").font('Helvetica');
      doc.moveDown();
      x=doc.x;
      y= doc.y;
      let dataArray=[
          doc,
          x,
          y,
          distributor_keys.by_living_area_exept_groundfloor,
          owner_community_costs.living_area_except_ground_floor,
          owner_community.total_area-owner_community.ground_floor_area,
	  apartment.apartment_size,
          "m²",
          sums.owner_community_costs.living_area_except_ground_floor,
          counter ]
      writeDestKeyAndCostTable(dataArray);
    }
            
    if(owner_community_costs.number_flats.length>0){
      counter++; 
      if(y>600) { doc.addPage(); y=doc.y;}
      doc.font('Helvetica-Bold').text("Berechnung des Verteilerschlüssels anhand der Anzahl an Wohnungen:").font('Helvetica');
      doc.moveDown();
      x=doc.x;
      y= doc.y;
      let dataArray=[
          doc,
          x,
          y,
          distributor_keys.by_number_flats,
          owner_community_costs.number_flats,
          owner_community.number_flats,
          "1",
          "Wohnheinheiten",
          sums.owner_community_costs.number_flats,
          counter ] 
      writeDestKeyAndCostTable(dataArray);
    }
    
    if(owner_community_costs.living_area_except_business_area.length>0){
      counter++; 
      if(y>600) { doc.addPage(); y=doc.y;}
      doc.font('Helvetica-Bold').text("Berechnung des Verteilerschlüssels anhand der Wohnfläche (Außer Gewerbe):").font('Helvetica');
      doc.moveDown();
      x=doc.x;
      y= doc.y;
      let dataArray=[
          doc, 
          x, 
          y,
          distributor_keys.by_living_area_exept_business_area, 
          owner_community_costs.living_area_except_business_area,
          owner_community.total_area - owner_community.business_area,
          apartment.apartment_size,
          "m²" , 
          sums.owner_community_costs.living_area_except_business_area,
          counter ]
      writeDestKeyAndCostTable(dataArray);
    }
        
        doc.moveDown();
        x=doc.x;
        y= doc.y;
        doc.font('Helvetica-Bold').text("Direkt zurechenbare kosten:").font('Helvetica');
        doc.text("Kosten, die direkt Ihrer Wohnung zugerechnet werden können, werden in der Abrechnung direkt ihrer Wohnung zugerechnet. Hierzu zählen unter anderem Grundsteuern, die als laufende öffentliche Lasten des Grundstücks gemäß §2 Nr. 1 BetrKV zu den umlagefähigen Kosten gehören.");
        doc.text("Der verteilerschlüssel ermittelt sich hierbei aus der Differenz zwischen der Periode innhalb des Abrechnungsjahres, die Sie genutzt haben und dem Zeitraum des Abrechnungsjahres.");
        doc.moveDown();
        
        
        
        x=doc.x;
        y= doc.y;
        if(y>600) { doc.addPage(); y=doc.y;}
        //doc.font('Helvetica-Bold').text("Grundsteuer:", 72, y).font('Helvetica');
        doc.font('Helvetica-Bold').text("Ihre Kosten:", 72, y).font('Helvetica');
        y=y+30;
        x=72;
        doc.text("Bezeichnung", x, y);
        x+=200;
        doc.text("Gesamtkosten", x,y);
        x+=100;
        doc.text("Verteilerschlüssel", x, y);
        x+=120;
        doc.text("Ihr Anteil", x, y);
        //Table line
        y=y+15;
        doc.moveTo(72, y).lineTo(550, y).stroke();
        y=y+5
        for(let key in apartment_costs){
            if(apartment_costs[key].designation=="network"){apartment_costs[key].designation="Telefon- und Internet"}
            if(apartment_costs[key].designation=="heating"){apartment_costs[key].designation="Heizung"}
            if(apartment_costs[key].designation=="heating_and_hot_water"){apartment_costs[key].designation="Heizung und Warmwasser"}
            if(apartment_costs[key].designation=="hot_water"){apartment_costs[key].designation="Warmwasser"}
            if(apartment_costs[key].designation=="electricity"){apartment_costs[key].designation="Strom"}
            if(apartment_costs[key].designation=="taxes"){apartment_costs[key].designation="Grundsteuern"}
            // console.log(apartment_costs[key])
            x=72;
            doc.text(apartment_costs[key].designation, x, y);
            doc.text( setAsCost( apartment_costs[key].finalCosts ), x+170,y, {width:80, align:'right'});
            doc.text(distributor_keys.for_individual_costs, x+300, y);
            doc.text( setAsCost( apartment_costs[key].partialCosts ), x+390, y, {width:80, align:'right'});
            y=y+15;
        }
        doc.moveTo(72, y).lineTo(550, y).stroke();
        y+=5
        counter++;
        doc.text("Gesamtkosten " + counter, 72, y);
        doc.text( setAsCost( sums.apartment_costs.finalCosts ), x+170,y, {width:80, align:'right'});
        doc.text(setAsCost(sums.apartment_costs.partialCosts ), x+390, y, {width:80, align:'right'});
        doc.moveDown();
        
        doc.x=72;
        x=72;
        y= doc.y;
        doc.moveDown();
        doc.font('Helvetica-Bold').text("Bezeichnung", x, y);
        x+=130;
        doc.text("Kosten", x, y).font('Helvetica');
        y=y+15;
        x=72;
        doc.moveTo(72, y).lineTo(300, y).stroke();
            
            counter = 0;
            for(let key in sums.owner_community_costs){
              if(sums.owner_community_costs[key].partialCosts!=0){
                y=y+15;
                counter++;

                doc.text( "Gesamtkosten " + counter  , x, y);
                x+=130;
                doc.text(setAsCost(sums.owner_community_costs[key].partialCosts), x, y, {width:80, align:'right'});
                x=72;
              }
            }
          if(sums.apartment_costs.partialCosts!=0){
            y=y+15;
            counter++;
            doc.text( "Gesamtkosten " + counter  , x, y);
            x+=130;
            doc.text(setAsCost(sums.apartment_costs.partialCosts), x, y, {width:80, align:'right'});
            x=72;
          }
            y=y+15;
            doc.moveTo(72, y).lineTo(300, y).stroke();
            y=y+5;
            x=72;
            
            doc.font('Helvetica-Bold').text("Ihre Betriebskosten", x, y);
            x+=130;
            doc.text(setAsCost(calculationResults.all_partial_costs), x, y, {width:80, align:'right'});
            y=y+15;
            x=72;
            doc.text("Ihre Vorauszahlungen", x, y);
            x+=130;
            doc.text(setAsCost(calculationResults.prepayment), x, y, {width:80, align:'right'});
            y=y+15;
            doc.moveTo(72, y).lineTo(300, y).stroke();
            y=y+5;
            x=72;
   
   
            if(calculationResults.all_partial_costs > calculationResults.prepayment){
              doc.text("Ihre Nachzahlung", x, y);
              x+=130;
              doc.text(setAsCost(calculationResults.difference), x, y, {width:80, align:'right'});
            }else{
              doc.text("Ihr Guthaben", x, y);
              x+=130;
              doc.text(setAsCost(calculationResults.difference * (-1)), x, y, {width:80, align:'right'});  
            }
            
    
    doc.end();
}
