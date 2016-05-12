function convert(){
    var lines=document.getElementById("code").value.split('\n');
    var codediff=[],resultdiff=[];
    var pass=false;
    for(var i=0;i<lines.length;i++){
        var line=lines[i];
        if(/^\s*```/i.test(line)) pass=!pass;
        if(!pass && /^\s*#+/i.test(line)){
            if(/^\s*#+\s*\[.*\].*\(.*\).*/i.test(line)) continue;
            var s=0,e=line.length-1;
            while(/[\s#]/i.test(line[s])) s++;
            while(/[\s]/i.test(line[e])) e--;
            var heading=line.substring(s, e+1);
            var anchor='(#'+heading.toLowerCase().replace(/[^a-z0-9-\s]/g,'').replace(/\s/g, "-")+')';
            s=0;
            while(/[\s]/i.test(line[s])) s++;
            while(/[#]/i.test(line[s])) s++;
            codediff.push(lines[i]);
            lines[i]=line.substring(0, s)+' ['+heading+']'+anchor;
            resultdiff.push(lines[i]);
        }
    }
    document.getElementById("result").value = lines.join('\n');
    document.getElementById("codediff").value = codediff.join('\n');
    document.getElementById("resultdiff").value = resultdiff.join('\n');
    window.location = '#result';
};
