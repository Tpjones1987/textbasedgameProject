// rooms
class Room {
  constructor(name, desc) {
    (this._name = name), (this._desc = desc), (this._linkedRooms = {});
  }
  describe() {
    return this._desc;
  }

  linkRooms(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  changeRoom(currentRoom) {
    const direction = document.getElementById("input");
    if (direction in currentRoom._linkedRooms) {
      document.getElementById("description");
    }
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You cant go that way");
      return this;
    }
  }
}
// items
class Item {
  constructor(name, stat) {
    this._name = name;
    this._stat = stat;
  }
}
class Weapon extends Item {
  constructor(name, dmg, stat) {
    super(name, stat);
    this._damage = dmg;
  }
}

// characters
class character {
  constructor(name) {
    this._name = name;
  }
}

// functions
function displayRoomInfo(room) {
  console.log(`this is the current room ${room}`);
  document.getElementById("descriptionBox").innerHTML = room._desc;
  document.getElementById("changeDirectionInput").focus();
}

function startGame() {
  let currentRoom;
  currentRoom = JailCell;
  displayRoomInfo(currentRoom);
  document.addEventListener("keydown", function (event) {
    console.log("function hit");
    if (event.key === "Enter") {
      command = document.getElementById("changeDirectionInput").value;
      const directions = ["north", "south", "east", "west"];
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else {
        document.getElementById("changeDirectionInput").value = "";
        alert("You cant go that way");
      }
    }
  });
}

// starting room
const JailCell = new Room(
  "Jail Cell",
  "You wake up in a jail cell, you see that the cell door is open, move west?."
);
const WestCorridor = new Room(
  "West Corridor",
  "As you walk down the corridor you see more dead police officers, you also come across two doors, kennels to the north and corridor to the east."
);
const Kennel = new Room("Kennel", "You was killed by a pack of zombie dogs.");
const EastCorridor = new Room(
  "East Corridor",
  "You come across three doors weapon storage to the east, autopsy to the south and payphone corridor to the north."
);
const WeaponStorage = new Room(
  "Weapon Storage",
  "You found a handgun with one clip"
);
const AutopsyRoom = new Room(
  "Autopsy Room",
  "As you enter the room you see a person getting attacked by a zombie, do you help her or leave her."
);
const PayphoneCorridor = new Room(
  "Payphone Corridor",
  "You come across three doors main office to the west, interrogation room to the north and main hall to the south."
);
const MainOffice = new Room(
  "Main Office",
  "When you enter the room there is a zombie, do you kill the zombie and loot the room or leave."
);
const InterrogationRoom = new Room(
  "Interrogation Room",
  "As you enter you are killed by 3 zombies"
);
const MainHall = new Room(
  "Main Hall",
  "When you enter the room you see a giant mutated zombie, shoot him"
);
// end room

JailCell.linkRooms("west", WestCorridor);
WestCorridor.linkRooms("north", Kennel);
WestCorridor.linkRooms("east", EastCorridor);
EastCorridor.linkRooms("east", WeaponStorage);
EastCorridor.linkRooms("south", AutopsyRoom);
EastCorridor.linkRooms("north", PayphoneCorridor);
WeaponStorage.linkRooms("south", WestCorridor);
AutopsyRoom.linkRooms("north", WestCorridor);
PayphoneCorridor.linkRooms("east", MainOffice);
PayphoneCorridor.linkRooms("north", InterrogationRoom);
PayphoneCorridor.linkRooms("west", MainHall);
MainOffice.linkRooms("west", PayphoneCorridor);
InterrogationRoom.linkRooms("south", PayphoneCorridor);

console.log(JailCell);

const descriptionBox = document.getElementById("descriptionBox");
const inputBox = document.getElementById("changeDirectionInput");

descriptionBox.innerHTML = JailCell._desc;
console.log(inputBox);
startGame();
