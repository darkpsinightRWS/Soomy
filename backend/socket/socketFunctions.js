let users = [];
var rooms = [];
const AuctionRoom = require('./RoomClass')
const AuctionUser = require('./UserClass')
const Participation = require("../models/participation");
const addUser = async ({   
  id,
  app_id,
  montant,
  user,
  _id,
  mise,
  prix,
  title,
  roomCategory,
  image,
  isParticipated ,
  duration,
  photo,

}) => {
  
  let Room_test = rooms.find((obj) => {
    return obj._id === _id;
  })
  const participation = await Participation.findOne({user:app_id,room:_id});
  
  let participated = participation ?true : false ;
  let roomInfo
  let userInfo 
  if (!Room_test) {
    userInfo = new AuctionUser(id,user, montant, app_id , photo , participation?.freeCredit ,participated) ;
    roomInfo = new AuctionRoom(_id,mise,prix,title,roomCategory,image,duration);
    rooms = [
      ...rooms,
      roomInfo
    ];
   roomInfo.addUsers(userInfo)
  }// if room doesn't exist add room to rooms array
  else{
    roomInfo=Room_test // if room exists then roomInfo get room object
    let User_test =  roomInfo._users.find((obj) => {
      return (obj._appId===app_id)}); // look for user in room

      if (User_test) {
        userInfo = User_test
        return { control: true};
        
      
    }// if it exists get flag to true
    userInfo = new AuctionUser(id,user, montant, app_id,photo ,  participation?.freeCredit ,participated) ;
    
    roomInfo.addUsers(userInfo , roomInfo)
  }//else add user

  return { userInfo , roomInfo };
};
const getUser = (id) => {
  return users.find((e) => e.id == id);
};
const getRoom = (room) => {
  return rooms.find((obj) => obj._id === room);
};

/******************************************************************** */
const removeRoom = (id) => {
  const findIdx = rooms?.findIndex((e) => e?._id == id);

  if (findIdx >= 0) {
    return rooms?.splice(findIdx, 1)[0];
  }
  
};
module.exports = {
  addUser,
  getUser,
  getRoom,
  removeRoom,

};