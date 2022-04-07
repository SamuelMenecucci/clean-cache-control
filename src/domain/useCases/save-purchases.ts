//arquivo entidades e interfaces
export interface SavePurchases {
  //tipo uma função chamada save, que recebe como paramêtro purchases, que eu tipo como um array do tipo Params, e essa função não retorna nada. deixo como promise para que eu consiga trabalhar de forma assíncrona
  save: (purchases: Array<SavePurchases.Params>) => Promise<void>;
}

namespace SavePurchases {
  export type Params = {
    id: string;
    date: Date;
    value: number;
  };
}

// //como os dois estão diretamente ligados, faria mais sentido deixar dessa forma, mas o typescript não permite assim, por isso iremos utilizar um namespace para que não precisemos fazer dois imports quando formos utilizar  a interface
// export interface SavePurchases {
//     //tipo uma função chamada save, que recebe como paramêtro purchases, que eu tipo como um array do tipo PurchaseModel e essa função não retorna nada
//     save: (purchases: Array<PurchaseModel>) => Promise<void>;

//     type PurchaseModel = {
//         id: string;
//         date: Date;
//         value: number;
//       };
// }

//   //arquivo entidades e interfaces
// export interface SavePurchases {
//     //tipo uma função chamada save, que recebe como paramêtro purchases, que eu tipo como um array do tipo PurchaseModel e essa função não retorna nada
//     save: (purchases: Array<PurchaseModel>) => Promise<void>;
//   }

//   type PurchaseModel = {
//     id: string;
//     date: Date;
//     value: number;
//   };
