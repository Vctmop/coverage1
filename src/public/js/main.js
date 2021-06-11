const map = L.map('map-template').setView([1.9239633999999999, -76.2131361], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let bander=true;
var customIcon1=new L.icon({
    iconUrl: 'https://www.shareicon.net/data/2016/10/18/845993_electrical_512x512.png',
    iconSize:     [40, 50], // size of the icon
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -26] // point from which the popup should open relative to the iconAnchor    
});

map.locate({enableHighAcuaracy: true});
const cords =map.on('locationfound', Ubicacion=>{
    const marker= L.marker(Ubicacion.latlng, {icon: customIcon1}).addTo(map);
    marker.bindPopup('Transmisor en las corrdenadas:<br> ' +  Ubicacion.latlng.lng + "," +  Ubicacion.latlng.lat);
    console.log(Ubicacion.latlng);
})

if (bander==true){
    customIcon2=new L.icon({
        iconUrl: 'http://www.clipartbest.com/cliparts/xig/LEo/xigLEo6yT.png',
        iconSize:     [30, 38], // size of the icon
        iconAnchor:   [20, 22], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -26] // point from which the popup should open relative to the iconAnchor    
    });
    bander=false;
}
map.on('click',e=>{
    var coords=[e.latlng.lat,e.latlng.lng];
    const marker =L.marker(coords,{icon: customIcon2}).addTo(map);
    marker.bindPopup('Antena interferente en las corrdenadas:<br> ' +  e.latlng.lng + "," +  e.latlng.lat);
});

//Declarando variables

class data{
    constructor(Pt,Gt,efiT,f,Bw,Sr,M,efiR,hr,Fsis,interN,Pi1,Pi2,Pi3,Pi4,Pi5,Gi1,Gi2,Gi3,Gi4,Gi5,ht,ltt,PE,distor,dist){
    this.Pt=Pt;     this.Gt=Gt;     this.efiT=efiT;     this.f=f;
    this.Bw=Bw;     this.Sr=Sr;     this.efiR=efiR;     this.Fsis=Fsis;
    this.interN=interN;     this.Pi1=Pi1;     this.Pi2=Pi2;     this.Pi3=Pi3;
    this.Pi4=Pi4;     this.Pi5=Pi5; this.Gi1=Gi1;     this.Gi2=Gi2;     this.Gi3=Gi3;
    this.Gi4=Gi4;     this.Gi5=Gi5; this.ht=ht;  this.ltt=ltt; this.hr=hr; this.PE=PE;  this.distor=distor; this.dist=dist;

}}

//Recoger datos de pantalla
document.addEventListener('submit', (e) => {
    const Pt=document.getElementById('Pt').value;
    const G=document.getElementById('Ganancia').value;
    const efiT=document.getElementById('eficienciaT').value;
    const f=document.getElementById('f').value;
    const Bw=document.getElementById('Bw').value;
    const ht=document.getElementById('ht').value;
    const ltt=document.getElementById('ltt').value;
    const Sr=document.getElementById('Sr').value;
    const M=document.getElementById('M').value;
    const Fsis=document.getElementById('Fsis').value;
    const efiR=document.getElementById('eficienciaR').value;
    const hr=document.getElementById('hr').value;
    const interN=document.getElementById('interN').value;
    const Gi1=document.getElementById('Gi1').value;
    const Pi1=document.getElementById('Pi1').value;
    const Gi2=document.getElementById('Gi2').value;
    const Pi2=document.getElementById('Pi2').value;
    const Gi3=document.getElementById('Gi3').value;
    const Pi3=document.getElementById('Pi3').value;
    const Gi4=document.getElementById('Gi4').value;
    const Pi4=document.getElementById('Pi4').value;
    const Gi5=document.getElementById('Gi5').value;
    const Pi5=document.getElementById('Pi5').value;
    const PE=document.getElementById('PE').value;
    const distor=document.getElementById('distor').value;
    const dist=document.getElementById('dist').value;
    const dataN= new data(Pt,G,efiT,f,Bw,Sr,M,efiR,hr,Fsis,interN,Pi1,Pi2,Pi3,Pi4,Pi5,Gi1,Gi2,Gi3,Gi4,Gi5,ht,ltt,PE,distor,dist);
    //Llamando las funciones
    /*
    const Op=new Op();
    d= Op.DfreeSpacePathLoss(dataN);
    */
    console.log(dataN)
    e.preventDefault();
});
//Tomando datos de posición

class Op{
    
    DfreeSpacePathLoss(dataN) {
        let pnr=dataN.Fsis+10* Math.log10(Bw)-174;
        let prn=dataN.Sr+dataN.M;
        let pdr=prn;
        let lb=dataN.Pt-pdr+2*dataN.G-2*dataN.lt;
        return 10**((lb-92.45-20*  Math.log10(f))/20);
    }
    //Metodo deterministico

    Deterministic(dataN,d){
        let landa=((3*10**8)/(dataN.f*10**9));
        let valores=[],di=[];
        for (i =-d/2;i<d/2;i++){
            for (j =-d/2;j<d/2;j++){
                d= Math.sqrt(( i - dataN.f )^2 + ( j - L.latlng.lng)**2);
                let lbf=(4*Math.PI/landa)
                let ae=((1/(2*Math.sin(2*Math.PI*hr*ht)/(landa*d)))**2);
                let lb=lbf*ae;
                Pdr=dataN.Pt+2*dataN.G-2*dataN.lt;
                for(k=0;k<dataN.interN;k++){
                    let ds=Math.sqrt((k-fi(k))**2+(j-_latlng[k])**2);
                    di.push(ds);
                    let lbfi=(4*Math.PI*di(k))/(3*10**8/dataN.frqi*10**6);
                    let aei=((1/(2*Math.sin(2*Math.PI*dataN.hti*dataN.hr)))/((3*10**8/frqi*10*10**6)*di))**2;
                    let lbi=lbfi*aei;
                    let pri=pi(k)+gi(k)-lbi+dataN.G-2*dataN.ltt;
                }
                let total=0,numeros = [1, 2, 3, 4, 5];
                numeros.forEach(function(a){total += a;});
                let ci=Pdr-10*Math.log10(total);
                /*
                if (ci>=prn){
                    function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 8,
                            fillColor: "#ff7800",
                            color: "#000",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                    });
                }
                */
            } 
        } 
    } 
}
