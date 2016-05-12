function convert(){
    var lines=document.getElementById("code").value.split('\n');
    var consoletext=[];
    var pass=false;
    var hmap={};
    for(var i=0;i<lines.length;i++){
        var line=lines[i];
        if(/^\s*```/i.test(line)) pass=!pass;
        if(!pass && /^\s*#+/i.test(line)){
            if(/^\s*#+\s*\[.*\].*\(#.*\).*/i.test(line)){
                consoletext.push('SKIP:\t'+'L'+(i+1)+'\t'+line);
                continue;
            }
            var s=-1,e=line.length;
            while(/[\s#]/i.test(line[++s]));
            while(/[\s]/i.test(line[--e]));
            var heading=line.substring(s, e+1);
            var anchor='#'+heading.toLowerCase().replace(/[^a-z0-9-\s]/g,'').replace(/\s/g, "-");
            s=-1;
            while(/[\s]/i.test(line[++s]));
            while(/[#]/i.test(line[++s]));
            var logline='L'+(i+1)+'\t'+lines[i];
            lines[i]=line.substring(0, s)+' ['+heading+']('+anchor+')';
            logline+=' => '+lines[i];
            if(anchor in hmap || /[\[\]\(\)]+/i.test(heading) || /[\[\]\(\)]+/i.test(anchor)){
                if(anchor in hmap) consoletext.push('WARN:\t'+logline+"\tThe anchor is not unique. L"+hmap[anchor]);
                if(/[\[\]\(\)]+/i.test(heading)||/[\[\]\(\)]+/i.test(anchor)) consoletext.push('WARN:\t'+logline+"\tSpecial characters exist.");
            }
            else consoletext.push('PASS:\t'+logline);
            if(!(anchor in hmap)) hmap[anchor]=i+1;
        }
    }
    consoletext.push('Something wrong? Please report it in https://github.com/petrosliu/Heading-Anchor-Converter/issues');
    document.getElementById("result").value = lines.join('\n');
    document.getElementById("console").value = consoletext.join('\n');
    window.location = '#result';
};

function clearinput(){
    document.getElementById("code").value = "";
    document.getElementById("result").value = "";
    document.getElementById("console").value = "Example:\nPASS:	# H1 => # [H1](#h1)\nPASS:	## H2 => ## [H2](#h2)\nPASS:	### H3 => ### [H3](#h3)";
}