import english from '../../public/locates/en/common.json'
import bangla from '../../public/locates/bn/common.json'
const defaultLan = 'bn';

class Index {
    setLan(lan) {
        localStorage.setItem('language', lan);
        return lan;
    }

    getLan() {
        let lan = localStorage.getItem('language')?localStorage.getItem('language'):this.setLan(defaultLan);
        return lan;
    }
    translate(key){
        return bangla

    }

}

export default Index = new Index();
