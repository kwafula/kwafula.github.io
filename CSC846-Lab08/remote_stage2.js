// URL token 
// Obfuscating Data => Date Encoding: Nested encoding as reverse string + charcode
var aNQy34 = "6c 6d 74 68 2e 6d 6f 63 61 65 62 2f 73 77 65 6e 2f 75 64 65 2e 75 73 64 2f 2f 3a 73 70 74 74 68"

// Fucniton to reverse string
// Obfuscating Layout => Meaningless Identifiers: reverseString() = aZXj44(), reversed = aPTx15
function aZXj44(aHTj33) {
  var aPTx15 = aHTj33.split('').reverse().join('');
  //WScript.Echo(aPTx15);
  return aPTx15;
}

// Funtion to decode Charcode to String
// Obfuscating Layout => Meaningless Identifiers: decodeCharCode() = aQRt78(), charCode = aPJk65, urlSplit = aFLw88, charCodeToStr = aTTy98
// codeArray = aDFg56, charArray = aPGv43
function aQRt78(aPJk65) {
	var aFLw88 = aPJk65.split(" ");
	//WScript.Echo(urlSplit);
	var aTTy98;
	if (aFLw88) {
    	var aDFg56 = String(aFLw88).split(',');
    	var aPGv43 = [];
		for (var i = 0; i < aDFg56.length; i++) {
    		aPGv43.push(String.fromCharCode(parseInt(aDFg56[i], 16)));
		}
    	aTTy98 = aPGv43.join('');
	}
	//WScript.Echo(charCodeToStr);
  return aTTy98;
}

// Function to open URL
// Obfuscating Layout => Meaningless Identifiers: openPage() = oPNe71, ie = eXEq76
function oPNe71(aGNf23)	{
	var eXEq76 = new ActiveXObject("InternetExplorer.Application");
	// Obfuscating Controls => Bogus Control Flows: The "Try" statement will all result in and error leading to the "Catch" statement always executing
	try	{
		if (eXEq76.Visible == ieXEq79.Visible);
	} catch (e){
		// Obfuscating Controls => Bogus Control Flows: Both "If" and "Else" statement will always set ie.Visible to bolean true
		if ( (Math.floor(Math.random() * 100) + 1) % 2 ) {
			eXEq76.Visible = true; // Makes the IE window visible
			//WScript.Echo("Even Launch");
		} else {
			eXEq76.Visible = ( aNQy34.length === 95);
			//WScript.Echo("Odd Launch");
		}
		eXEq76.Navigate(aGNf23); // Navigates to the specified URL
	}
}

// Launch IE and open DSU New page
// Obfuscating Layout => Meaningless Identifiers: urlCode = aNQy34, reversedStr = aJTp75, reverseString() = aZXj544(), urlStr = aKTv65
if (typeof aNQy34 !== 'undefined') { 
	//WScript.Echo(aNQy34);
	var aJTp75 = aQRt78(aNQy34);
	var aKTv65 = aZXj44(aJTp75);
	//WScript.Echo(urlStr);
	oPNe71(aKTv65);
}
