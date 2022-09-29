import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

//   transform(value: any, args?: any): any {
//     if(!value)return null;
//     if(!args)return value;

//     args = args.toLowerCase();

//     return value.filter(function(data:any){
//         return JSON.stringify(data).toLowerCase().includes(args);
//     });
// }

transform(value:any, keyword:string) {       
  if(!keyword)
  return value;
  let filteredValues:any=[];      
  for(let i=0;i<value.length;i++){
      if(value[i].name.toLowerCase().includes(keyword.toLowerCase())){
          filteredValues.push(value[i]);
      }
  }
  return filteredValues;
}
}
