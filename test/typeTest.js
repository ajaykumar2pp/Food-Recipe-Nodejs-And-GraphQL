const typeDefs =`#graphql

type Recipe{
    title: String
    price:Int
}

type Query{
    test : String
    sayHello(name:String):String
}


`;

module.exports ={typeDefs}