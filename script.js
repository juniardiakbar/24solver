tombol = document.getElementById("getHasil");
form = document.getElementsByClassName("inputNum")

function mainfunc(form){
    arr = []
    for (let i=0; i<form.length; i++){
        arr.push(form[i].value);
    }
    result = main(arr)
    count = 0;
    for (k=0; k<4; k++){
        nama = "sol"+(k+1).toString()
        document.getElementById(nama).innerHTML = "";
    }
    if (result[0] != 0){
        firstNum = result[1][count][1];
        kelas = 1;
        while (count != result[1].length){
            i = result[1][count];
            temp = i[1];
            if (temp != firstNum){
                firstNum = temp;
                kelas++;
            }
            nama = "sol" + (kelas).toString()
            if (i[0] == 1){
                tipe = document.createElement("li");
                node = document.createTextNode("(("+i[1].toString()+operator[i[5]]+i[2].toString()+")"+operator[i[6]]+i[3].toString()+")"+operator[i[7]]+i[4].toString());
                tipe.appendChild(node);
                tipe.classList.add("list-group-item");
                document.getElementById(nama).appendChild(tipe)
            }else if (i[0] == 2){
                tipe = document.createElement("li");
                node = document.createTextNode("("+i[1].toString()+operator[i[6]]+"("+i[2].toString()+operator[i[5]]+i[3].toString()+"))"+operator[i[7]]+i[4].toString());
                tipe.appendChild(node);
                tipe.classList.add("list-group-item");
                document.getElementById(nama).appendChild(tipe)
            }else if (i[0] == 3){
                tipe = document.createElement("li");
                node = document.createTextNode("("+i[1].toString()+operator[i[5]]+i[2].toString()+")"+operator[i[7]]+"("+i[3].toString()+operator[i[6]]+i[4].toString()+")");
                tipe.appendChild(node);
                tipe.classList.add("list-group-item");
                document.getElementById(nama).appendChild(tipe)
            }else if (i[0] == 4){
                tipe = document.createElement("li");
                node = document.createTextNode(i[1].toString()+operator[i[7]]+"(("+i[2].toString()+operator[i[5]]+i[3].toString()+")"+operator[i[6]]+i[4].toString()+")");
                tipe.appendChild(node);
                tipe.classList.add("list-group-item");
                document.getElementById(nama).appendChild(tipe)
            }else if (i[0] == 5){
                tipe = document.createElement("li");
                node = document.createTextNode(i[1].toString()+operator[i[7]]+"("+i[2].toString()+operator[i[6]]+"("+i[3].toString()+operator[i[5]]+i[4].toString()+"))");
                tipe.appendChild(node);
                tipe.classList.add("list-group-item");
                document.getElementById(nama).appendChild(tipe)
            }

            count = count+1;
        }
    }
    document.getElementById("hasil").innerHTML = "<b>" + result[0] + " solutions found";
}

input = document.getElementById("coba1");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    mainfunc(form)
  }
});

tombol.addEventListener("click", function(){
    mainfunc(form)
})

document.getElementById("hapus").addEventListener("click", function(){
    for (i=1;i<=4;i++){
        document.getElementById(i.toString()).value = "";
        nama = "sol"+i.toString()
        document.getElementById(nama).innerHTML = "";
    }
    document.getElementById("hasil").innerHTML = "";
})


function hitung(a,b,op){
    a = Number(a)
    b = Number(b)
    
    if (op=="+"){
        return (a+b)
    } else if (op=="-"){
        return (a-b)
    } else if (op == '*'){
        return (a*b)
    } else if (op =='/'){
        if (b!=0){
            return (a/b)
        } else{
            return -999
        }
    }
}

function calculate(a,b,c,d,hasil){
    count = 0
    operator = ['*','/','+','-']
    for (let i=0; i<4; i++){
    // Perulangan untuk operator pertama
        for (let j=0; j<4; j++){
        // Perulangan untuk operator kedua
            for (let k=0; k<4; k++){
                // Perulangan unutk operator ketiga
                hsl = []
                hsl1=hitung(hitung(hitung(a,b,operator[i]),c,operator[j]),d,operator[k]);
                hsl2=hitung(hitung(a,hitung(b,c,operator[i]),operator[j]),d,operator[k])
                hsl3=hitung(hitung(a,b,operator[i]),hitung(c,d,operator[j]),operator[k])
                hsl4=hitung(a,hitung(hitung(b,c,operator[i]),d,operator[j]),operator[k])
                hsl5=hitung(a,hitung(b,hitung(c,d,operator[i]),operator[j]),operator[k])
                hsl.push(hsl1)
                hsl.push(hsl2)
                hsl.push(hsl3)
                hsl.push(hsl4)
                hsl.push(hsl5)

                idx = 0
                hsl.forEach(function(l){
                    idx = idx+1
                    if (l == 24){
                        count = count+1
                        list_hasil = []
                        list_hasil.push(idx)
                        list_hasil.push(a)
                        list_hasil.push(b)
                        list_hasil.push(c)
                        list_hasil.push(d)
                        list_hasil.push(i)
                        list_hasil.push(j)
                        list_hasil.push(k)
                        hasil.push(list_hasil)
                    }
                })
            }
        }
    }
                    
    return count;
}

function notInList(perm, list_perm){
    for (let i=0; i<perm.length; i++){
        x = perm[i]
        sama = true;
        j=0;
        while (j<x.length && sama){
            if(list_perm[j] != x[j]){
                sama = false;
            } else{
                j = j+1;
            }
        }
        if (sama){
            return(false);
        }
    }
    return(true);
}

function main(arr){
    operator = ['*','/','+','-']
    perm = []
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            if (i != j){
                for (let k=0; k<4; k++){
                    if (k != i && k != j){
                        for (let l=0; l<4; l++){
                            if (l != i && l != j && l != k){
                                list_perm = []
                                list_perm.push(arr[i])
                                list_perm.push(arr[j])
                                list_perm.push(arr[k])
                                list_perm.push(arr[l])
                                if (notInList(perm,list_perm)){
                                    perm.push(list_perm)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    count = 0
    // count adalah variabel yang menampung banyaknya kemungkinan solusi
    hasil = []
    // hasil adalah list yang menampung seluruh kemungkinnan operasi perhitungan 
    perm.forEach(function(i){
        count = count + calculate(i[0],i[1],i[2],i[3],hasil)
    })
    return [count,hasil,perm]
}