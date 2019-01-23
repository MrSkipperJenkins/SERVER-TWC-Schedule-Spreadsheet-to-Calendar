// EXTRA TRIGGER BUILDER CODE
function getTriggerSrcIDs() { //NEEDS WORKS, needs to accoutn for errors in diff types of triggers
  var triggers = ScriptApp.getProjectTriggers()
  var triggerIDs = [];
  for (var h = 0; h < triggers.length; h++) {
    triggerIDs.push(triggers[h].getTriggerSourceId());
  }
  
  return triggerIDs;
}

function test() {  
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    Logger.log(triggers[i].getTriggerSourceId());// == ScriptApp.EventType.CLOCK) {
      // Some code here - other options are:
      // ScriptApp.EventType.ON_EDIT
      // ScriptApp.EventType.ON_FORM_SUBMIT
      // ScriptApp.EventType.ON_OPEN
    //}
  }    
}


function setAllTriggers() {
  //var Dfolder = DriveApp.getFolderById('0B6BXSE7lNq7FX1dsM3RLRHBaRTQ');
  //var folders = Dfolder.getFolders();
  
  var folders = DriveApp.getFolderById('1OhfvnW7mvYkqzYYmTuhUOwXaJSLXsUaf'); //set to month folder
  
//  while (folders.hasNext()) {
//    var currentFolder = folders.next();
//    Logger.log(currentFolder.getName());
    
    var folderFiles = folders.getFiles();
    while (folderFiles.hasNext()) {
      var file = folderFiles.next();
      var sheetId = file.getId();
      var ss = SpreadsheetApp.openById(sheetId);
      createSpreadsheetChangeTrigger(ss);
      Logger.log(file + sheetId);
    }
//  }
}


function deleteTrigger(triggerId) {
  // Loop over all triggers.
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    // If the current trigger is the correct one, delete it.
    if (allTriggers[i].getUniqueId() == triggerId) {
      ScriptApp.deleteTrigger(allTriggers[i]);
      break;
    }
  }
}


function deleteAllTriggers() {
  // Loop over all triggers.
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }
}
//  var triggerObject {id : triggers[i].getTriggerSourceId(),
//                     name: function() {try {var ss = SpreadsheetApp.openById(this.id); return ss.getName();}},
//                     del: "FALSE"}
// var currentTriggers = [];
  
//    for (var i = 0; i < sheetIds.length; i++) { //go through current triggers and remove those that are not working
//      for (var h = 0; h < triggers.length; h++) {
//        var triggerSrcId = triggers[i].getTriggerSourceId();
//        var markForDelete = FALSE;
//        var isAMatch = FALSE;
//        
//        if (triggerSrcId) { //check if trigger is timed or attached to a sheet on change
//          if (triggerSrcId == sheetIds[i]) { 
//            isAMatch = TRUE; 
//          } else
//            markForDelete = TRUE;
//        } else if (triggers[i].getEventType() == ScriptApp.EventType.CLOCK) { //if it's the clock type trigger likely scheduled once a week: IGNORE
//          isAMatch = FALSE;
//          markForDelete = FALSE;
//        } else {
//          isAMatch = FALSE;
//          markForDelete = FALSE;
//        
//        
//          
//      var triggerType = triggers[i].getEventType();
//      var triggerSrc = triggers[i].getTriggerSource();
//      var triggerSrcId = triggers[i].getTriggerSourceId();
//      currentTrigger.push(new triggerObject.id : triggers[i].getTriggerSourceId(),
//                                             name: function() {try {var ss = SpreadsheetApp.openById(this.id); return ss.getName();}},
//                                             del: "FALSE"});     
//      if (triggerSrcId) {
//        try {
//          var ss = SpreadsheetApp.openById(triggerSrcId);
//          var triggerName = ss.getName();
//          var errMsg = "";
//          var shouldDelete = FALSE;
//        }
//        catch(e) {
//          var triggerName = "Error: ";
//          var errMsg = e +  " Marking trigger for deletion.";
//          var shouldDelete = TRUE;
//        }
//      } else { var triggerName = "Trigger not assicated with a sheet. Ignoring.."; }
//      
//      Logger.log("Trigger " + (i+1) + ": " + triggerType + " / " + triggerSrc + " with ID: " + triggerSrcId + ". Document name: " + triggerName + errMsg);
//      
//      if (shouldDelete) { 
//        ScriptApp.deleteTrigger(triggers[i])  //delete bad trigger
//      } else {
//        currentTriggerIds.push(triggerSrcId);
//      }
//    
//      for (var j = 0; j < sheetIds.length; j++) { //check against sheetIds list 
//        if (triggerSrcId == sheetIds[j]) {
//          
//    
//    
//    
//    }
//    
//     
//    for (var j = 0; j < sheetIds.length; j++) {
//      for (var k = 0; k < triggers.length; k++) {
//        if (sheetIds[j] == triggers[k]) {
//      
//      
      //      if (triggerType == ScriptApp.EventType.ON_CHANGE) { //examine all triggers except for the one weekly timed trigger
//        Logger.log("ON_CHANGE type trigger found.")
//        var match = false;
//        
//        for (var t = 0; t < sheetIds.length; t++) { //check against IDs gathered from sheetIds function
//          if (triggers[i].getTriggerSourceId() == sheetIds[t]) { var match = true; }
//        }
//        
//        if (!match) { ScriptApp.deleteTrigger(triggers[i]) } //if no match then delete trigger for that sheet
//      }
//    }
//  }
//  
//  for (var q = 0; q < sheetIds.length; q++) { 
//    // I DUNNO, MAYBE CREATE A PROTOTYPE OR CLASS SO THAT YOU CAN JUST RUN THE ID CHECK ONCE AND STORE THE INFO IN TRIGGER[I].CURRENT_MATCH =TRUE/FALSE????
//  }
  
  //Figure out from that which schedules to be looking at
  //Grab direcctory and spreadsheet information
  //Build or Remove needed triggers accordingly to that finding






function getScheduleNameFromEmail(email) {
  switch (email) {
    case "benjamin.bauer@weathergroup.com":
      return "Ben Bauer";
      break;
     
    case "ryan.bowles@weathergroup.com":
      return "Ryan Bowles";
      break;
      
    case "brian.bruck@weathergroup.com":
      return "Brian Bruck";
      break;
  
    case "edward.bruno-gaston@weathergroup.com":
      return "Edward Bruno-Gaston";
      break;
    
    case "fatinah.chen@weathergroup.com":
      return "Fatinah Chen";
      break;
    
    case "pierce.gossett@weathergroup.com":
      return "Pierce Gossett";
      break;  
      
    case "conrad.hirzel@weathergroup.com":
      return "Chip Hirzel";
      break;  
      
    case "aj.keane@weathergroup.com":
      return "AJ Keane";
      break;  
    
    case "chris.mcdaniel@weathergroup.com":
      return "Chris McDaniel";
      break;
      
    case "matthew.miller@weathergroup.com":
      return "Matthew Miller";
      break;
      
    case "kevin.sheridan@weathergroup.com":
      return "Kevin Sheridan";
      break;  
      
    case "robb.williams@weathergroup.com":
      return "Robb Williams";
      break;  
      
    case "tom.williams@weathergroup.com":
      return "Tom Williams";
      break;  
      
    case "matthew.wooley@weathergroup.com":
      return "Matt Wooley";
      break;  
  }
}