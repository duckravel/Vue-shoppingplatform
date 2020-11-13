export default function (time) {
    const date = new Date(time);
    return date.toLocaleDateString();
    
  }