
// random words generation
const randomgen = function () {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let gen: string = "";
  
    const value = Math.floor(Math.random() * (Math.floor(12) - Math.ceil(3))) + Math.ceil(3)
  
    for (let i = 0; i < value; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length))
    }
  
    return gen;
  }
  
  export default randomgen;