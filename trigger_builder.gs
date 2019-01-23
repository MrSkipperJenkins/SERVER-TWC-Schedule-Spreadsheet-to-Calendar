////// trigger check/builder

function triggerManager() {
  var sheetIds = getSheetIds(); //the IDs of this, next, and next next month's schedule sheets
  
  try {    //attempt to get all triggers currently set up
    var triggers = ScriptApp.getProjectTriggers()
  }  
  catch(e) {
    return; // if error, then try again in a few minutes when function runs again
  }
    
  Logger.log("I've found a total of " + triggers.length + " trigger(s) currently installed.");
  
  //let's do a pre-check of all currently installed triggers and delete ones that aren't attached to anything or do not match current needed triggers
  if (triggers[0]) {
    for (var triggerIndex = 0; triggerIndex < triggers.length; triggerIndex++) {
      if (triggers[triggerIndex].getEventType() != ScriptApp.EventType.CLOCK) { //if it's a clock type, it's probably fine, move on
        var triggerSrcId = triggers[triggerIndex].getTriggerSourceId();
        var deleteFlag = true;
        
        try {
          var ss = SpreadsheetApp.openById(triggerSrcId);
          var triggerName = ss.getName();
          Logger.log("Trigger found currently attached to a spreadsheet (still unsure if spreadsheet should be monitored though): " + triggerName);
          // deleteFlag = false;
        }
        catch(e) {
          Logger.log("No speadsheet attached to trigger. Trigger should be deleted.");
          //ScriptApp.deleteTrigger(triggers[triggerIndex]);
        }
        
        for (var i = 0; i < sheetIds.length; i++) { //go through current triggers and remove if no match
          if (sheetIds[i] == triggerSrcId) { 
            deleteFlag = false 
            Logger.log("Found a match: " + triggerName);
          }; //found a match, do not delete this trigger
          
        }
        
        if (deleteFlag == true) { 
          Logger.log("No match found, deleting trigger: " + triggerName);
          ScriptApp.deleteTrigger(triggers[triggerIndex]);
        }
      
      } else { 
        Logger.log("Clock type trigger found. I'll ignore.");
      }
    }
  
    for (var i = 0; i < sheetIds.length; i++) { //go through current triggers and add the trigger if no match found
      var matchFound = false;
      
      for (var h = 0; h < triggers.length; h++) {
        if (triggers[h].getTriggerSourceId() == sheetIds[i]) { 
          var matchFound = true; 
          Logger.log("Match found at trigger #" + h + " with sheet #" + i);  
        }              
      }
      
      if (!matchFound) { 
        createSpreadsheetChangeTrigger(sheetIds[i]) 
        Logger.log(triggerName);
      }
    }
  }    
}


function getSheetIds() {
  var Today = new Date();
  var Dfolder = DriveApp.getFolderById('1LXTdfroHt5CknHbH6ddkDc2ybT05H63g');
  var sheetIds = [];
  
  //Get current month in string form
  var MonthOfYear = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
  var Month = [MonthOfYear[Today.getMonth()], MonthOfYear[Today.getMonth()+1], MonthOfYear[Today.getMonth()+2]]; //Get string form of month

  Logger.log('Examining theses months: ' + Month)
  
  for (var x = 0; x < Month.length; x++) {
    var MonthFolder = Dfolder.searchFolders('title contains "'+ Month[x] +'"');
    while (MonthFolder.hasNext()) {
      var folder = MonthFolder.next();
      Logger.log(folder.getName());
    }
    
    var folderSheets = folder.getFiles();
    
    while (folderSheets.hasNext()) {
      var sheet = folderSheets.next();
      var sheetName = sheet.getName();
      var sheetId = sheet.getId();
      
      Logger.log("Adding " + sheetName + " with ID: " + sheetId);
      
      sheetIds.push(sheetId);
    }
  }

  return sheetIds;
}


function createSpreadsheetChangeTrigger(ss) {
  //var ss = SpreadsheetApp.openById('1rcrUBWteaZPgBhGOyptKsCTH5nlf55uhdv9S75uSYTM');
  Logger.log("Adding trigger for spreadsheet ID: " + ss);
  ScriptApp.newTrigger('myTeamServerFunction') 
      .forSpreadsheet(ss)
      .onChange()
      .create();
}