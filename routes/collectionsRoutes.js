import CollectionsModel from "../model/CollectionsModel.js";
import {checkIfAuthenticated} from "../controller/authController.js";
import ItemsNameModel from "../model/ItemesNameModel.js"; 

const collectionsRoutesCreator = (app) => {
const routeString = "/api/collections";    
app.route(routeString)
.get(async (req, res, next) => {

   try{
    const dataObj = await CollectionsModel.find({});
     const newDataObj = {};
     dataObj.forEach(collection => {
         const {title , routeName , items , _id} = collection;
         newDataObj[title.toLowerCase()] = {_id, title, routeName , items}; 
     });
    res.status(200).send(newDataObj );
    }
    catch(error)
     {
        res.status(400);
        next(error);  
     }   
})
.post(async (req, res, next) => {
    const {collections} = req.body;
    if (!collections)
        {
            res.status(400).send({"error":"need to include collections array"}); 
            return; 
        }
    try{
            const insertedData = CollectionsModel.create(collections);
            res.status(200).send({insertedData});
       }
    catch(error)
        {
            res.status(400);
            next(error);  
        }   
})
;


app.route(routeString + "/autocomplete")
.get(async(req, res, next) => {
    const {searchString} = req.query; 
   const beginingRegExpString = `^${searchString}`; 
    try{
       const startItemsName = await ItemsNameModel.find({name:{$regex:beginingRegExpString, $options:'i'}});
       startItemsName.splice(10,startItemsName.length-1); 
       const itemsName = await ItemsNameModel.find({name:{$regex:searchString, $options:'i'}});
        let retItemsName = itemsName.filter(name => startItemsName.findIndex(n => n._id.toString() === name._id.toString()) === -1);
        retItemsName =  startItemsName.concat(retItemsName);
        retItemsName.splice(10,retItemsName.length-1);
        res.status(200).json(retItemsName);
       }    
    catch(error)
    {
        res.status(400);
        next(error); 
    }  
});

app.route(routeString + "/all")
.get(async(req, res, next) => {
    const {name} = req.query; 
    try{
        const collections = await CollectionsModel.find({}); 
        const items = [];
        collections.forEach(collection => {
            console.log(collection);
            const itemsFromCollection = collection.items.filter(item => {
                const flag = item.name === name; 
                return flag;
            });
            items.concat(itemsFromCollection);
        });
        res.status(200).json(items); 
       }
    catch(error)
        {
        res.status(400);
        next(error); 
        }   
});
}


export default collectionsRoutesCreator;
//5e15c523c4293b168ce1be54 5e15c523c4293b168ce1be54"