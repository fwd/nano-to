// Function to generate a unique UUID
function generateUUID() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function checkout() {

  var id = generateUUID()
  
  return {
    "id": `${id}`,
    "browser": `https://nano.to/id_${id}`,
    "json": `https://nano.to/checkout/${id}`,
    "check": `https://nano.to/confirm/${id}`,
    "qrcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAABmJLR0QA/wD/AP+gvaeTAAAbmklEQVR4nO2daXAcx3XH/z3Hzs4uCAIkIIKixPs+ILlEWYrLslMOFeuwHMuW5CNWRYnLSeQqf4tdFX+wiDhV+eDSt0SSP6RKKbsSXWFRjmSdsRTGtkRHFyGSMgGe4gUJgAASi52ZnaPzYRYksTgGjemZbUrvV7VVomamu2d3/uh+816/xwBw5Ajnk7tjjKU63kjj+Xn3n5a0408i7f03u/20/Sed34js8SWh5dobQRCzQoIkCIUgQRKEQhiN/0O2jSS6Bk86P2ubLq3NINsGFL2/pPZFvz/R/rO2udLeX9rxZf280QxJEApBgiQIhSBBEoRCTLEhG0nrh5J9vmy/WNrzRa8XtXHS2piy/bZJyLZ5ZbcnG9n6oBmSIBSCBEkQCkGCJAiFSLQhsyZrv5Hs2FbR9kVpdqxs2vMbyfp+mh07KxuaIQlCIUiQBKEQJEiCUIim25CN5B3bKUrWftC0/SUhahOntaHzfgdwuUMzJEEoBAmSIBSCBEkQCpFoQ6q2Rs/bL5Y2trLZfkrZsZaybTrZ48s7J5Ls9miGJAiFIEEShEKQIAlCIabYkM2O9ZOdN1X28UbS5qiRbaPKvl617ydt+2mvz1ofNEMShEKQIAlCIUiQBKEQjKvmaGyg2bGcSddnnXMoaz+oan7VvP2+qj3+NEMShEKQIAlCIUiQBKEQwvsh0/ptst7PmHUth6z9VlnvL0xqL2+b7nLL8ZP1fliaIQlCIUiQBKEQJEiCUAgj79odWddPzNvGkn1+ErJjTWXbyKr59bLeHym7lgvNkAShECRIglAIEiRBKMQUP2TWfpqs6yeq5oeUTdr9gXnHoiad30jW16ftL+taIjRDEoRCkCAJQiFIkAShEFP2Q2ZdS0G2n0u2ny3rWMWsba5m5xzK2oZPIm8bNAnR8dMMSRAKQYIkCIUgQRKEQjR9P6RqNmXS+WnH0+z9f3nb0LK/70byrt2RtY1KMyRBKAQJkiAUggRJEArBAEhddKtWWyFvGyBte3nHzuZt0+V9v3l/fxTLShAfI0iQBKEQJEiCUIgpNmTWtS+aHZuomp8rqb9Gmu3HFR1P0vl50+z9sUnn0wxJEApBgiQIhSBBEoRCNN0PKYpqsZCqxdY2krWfN2uyHm/eeWwbobysBKEwJEiCUAgSJEEoRGJe1qxra8juL22ezUZk17cUPT/tfsqsUc2mzTunj2ybkmZIglAIEiRBKAQJkiAUIjEva9Z+F9VqQySR9/3nnQdVlGbnVBIdjyh5+4VphiQIhSBBEoRCkCAJQiGEa3s0knfspuycNo1k7bdSrX3V61+qZlMm9U85dQjiYwQJkiAUggRJEAoxxYacckKTa0s0OwePKFmPN+8cQVmfL7s/UfKu9ZJ0Ps2QBKEQJEiCUAgSJEEohLANqdr+R9VrxjfbRhRF9doXjTQ7Flq2jS1csJUQY+fOnVLO5xw4VQkxUI0w5EQYcSNUfI5aCARR/KMaGsNdD+6GGdVgcQ92UEUprKAlGINi+5qJGaAZUpA8I1dGPY79Qz76RwOcOB/idCXEwHiEQSfCOY/D5To00wI0PR5bFIL7HoosRFtRQ0eRoausYVmLjhWtOta1GdjaYaDNys9SoRly9vantEeCFCNrQUYc2Dfo440PfBwYDnBw2Mfh0RDMXgAehUD9wzkHeBRPnZfCGMC0+L41HdB0ME0Hd8awtk3H5sUmtnaY2L7ERHeHDi3jqZMEOXv7U9pDQm2Pj9v+yLzvb66EHHj9bA17TtWwd8BH76Afi9D3wMMgFl8amAamG2CmBbgVbOswcEOXic8tK+CGpSYMrTlr2mbHooqS9X5VEqQCgtw36OO54zW8dMLFsXED0DRw30svwplgWizMKMKqcoCbV1i4baWF7k4zm/5mGwoJcvJxkCBTHU/DsBvhv4542HXYwf4RAJoO7tcAucnkZ4HVhRlg2yKGO9dYuGN1EYvt5tmYjZAgSZBCx+dL76CPRw86eOFEDY5WBK85U+3BvGAMrFCCHVbxxZUW7tts5zZbkiAnk/inkHM+6SN6nDE26ZN0vej5accvSuP4GGPo6emZ8/UhB54/7uHHr1Ww+3gEJ9LAvWrzxAgAnIN743C4jt3HI/z4tQqeP+4iFBhST0/PvF7QiP4+033/aT6yx5v0PCddT37IHHECjqf6HDzyroOzvgUeNnFWnAYeBgBj6D1v4yd7KxhyOL62rgjbICdmXpAgc6IacPz8YBU/63UwyovgtWqzhzQ9nIN7VZzlJTz4ZgXVgOPbm2yUSJS5QLGsOeDUxfjQvipGeQHwnWYPKRnfwTlu4aF9VfziPQdOoM5M/nHGkG2UNqKaUZ5EWsdwIyEHnupz8LNeB2OwAN+b8TvhAPyQI+Tx2zZDYzAk/8nkHPCjuA+NAabGMJ0LknMO5ns4b1p4eN84SgbDNzfa0BN+/rQvaUSfl6wDTdIeFx0fLVkz5qUTHh55N16mwndmfOAiDrQUGNZ2Glhc1FCLgP6RAKfGQhSSVDBHOAcsA9i80ERXWUM14Dg6GsfHTtfFhCjPmTYe7h1Hh81wy8qilLEQ00OCzJDeQR+P9FbjFzhzsBlrIceNSwv4xgYbDMBT/Q7+db+DcZ8nzkxzwQk5blpm4f5rSljdZuDF4x7+Zd94/F5phvY550CtirOshId7q7iyrDclgOCTAtmQGTHsRnj0oIPeERb7GBPQGFCpcbz1gQ8/5FjZquPeTSX88VUF1ET8DzNQq7f59Q02PnNlAWWTYf9wgDOVCPocngJec/DuiIZ/e8/FsJNRBBExNTCgkayDgZOQHbwrynxtokcPOPjpmxU4kR67E+YABxBGwHe22vjh9haUTIZXTtbwwGtjODwawJrnNMl53PZfd5fwd9eVYekMjx6o4qdvjuO8x+dspzLdgM0i/PD6Mv5isz39OYoF/2cdbC46nqT2aYbMgH2DPnYdduBo9pzFCEz8deR45piHF9/3AACfu6qAr6wpomgwRPP82+KEHDcuNXH3uiIsneGtD3082e9iyImEXhrxMICj29jV76B30J/fYIhZIUFKJog4fnXMw/4RzGmp2oipMZwcC/Fkn4sjowF0Bty5tojPXlmAO4+lqx9xXNWi4xsbbKxvN3C+xvHEIRfvDAbzcvjzWhXvjgC/Ol4TiuQh5gYJUjJ7B3y8/L4X70Wc53K5qDP87kwNuw678COOVQt13L3exopWXciejN/VMNyx2sIXV1gAgGePuXjuuAsNM77HSWiUA5qBl993sfdsbT4tELOgicaiNp4v+hGNNRS9XnZsZNL9XErEgT2najg2btR3bczzR2GAF3LsPuLh1VNxOzcvL+CO1UXoGpuzzp2A4/ouA3evt1Gqv8R5os/FQFVsqdoI9z0crRjYc7o272X0nPsSfL5E20t7ftrnvRGaISWyb9DH3gE/VlTKLVSWznBkNMCTh1ycroQoGgx3rSvi+i4TzhxmST8ClpY1fH2DjS2LDVTrcbRvDvgSYlM5oGl4/WyNbEnJkCAl8sYH8U7/NLPjpRR0hldP1fD0kfgFz6ZFBu5eV0RXSUMwi+dhQq63rSri1roj/4XjHp456iECn99StbEP30PvYIA3PiRByoQEKYlRj+PAcABmL5C2019nwPlahF39Ln53Jhb5rStjkUWczzgHOwHHp64wcM96G60Fhv7RAI8fcnGyEsKUlaqDR2D2AhwYDjDqkV9SFlrWNpjo/jPRNbvoeETbm8v99/T0YP9QgIPDQZx6QyK2wXBg2MeTfbFDfqHFcPf6Iro7TbjTBHwHEdBpa7hnvY1rOw3UIuCpPhevD9RQlBSCNwH3PRwcDrB/KJhxP2Ta31/0etHnOe3zm/Z5a/zQDCmJ/lEfh0cDIb/jXDE0hhdPeHjmWCz265aYuGtdEe1FbYrrIeQct6y08KVV8VvVl094ePqICz/k0waRp4GHAfpHAhwelX/Pn1RIkBLgHDhxPpS6XL0UQwOG3AhP9Tl4ZzB++O9YXcSO5QX4lyjSCTi6O0x8fYON9qKG4+dDPH7IwbHz8gLUJ1Fftp44H87Xw0M0QIKUQMVYgNOVMM6bmhG2wfD2YICn+hyM+RxXlDTcvc7GxkUG3PqWrfaihrvXF3H9EhMRB3YddvGbM/KXqpfCoxCnxyNUjAWZ9fFJYoofUnTN3Ihsv1FS/2lt3rT9A0DVaMHAeBQnMc6IiZE+e8zDC/Wl603LCvjK2iLKBoMXcty8vIAvr4nfqr56qobdh104gfyl6iSiEAPjIap6edrDaX/vRmT7rZPGK/r8ivolG6EZUgKuXsKgk60gAcDUgDOVEE/2Ozg0EoDVw+o+3WVibVu8k6PT1nBmPMLjhxz0jcw/IH3ORCEGnQiOXsq2n08ItB9SAi6zcM6TMwMAccRPbBpO3aioa8D/nq7hsUMOfrC9BcsX6LhvSwkVn+OPlhbAOfDEIQcvnvDAWBwgMB06g5SZk3OOUTdCTaONyzIgQUrA1wpwuQ7w9DNkxIHWAsNiW4POpsb7MABeCPSPhOgdDHDjUhNfuNoCqwts/1CA9z4KsLSswTbYtNdHHPjIjTDqSVjO8gguDNQYbVqWgSFqRzXOAknXNx4XnUVErxcdX9L1czn+z+9U8dZ+jsgbF+prOmoRR3dnAd/aGDv1Z4oV9SOOJeXY4rg0LnWhxfCNDTa+tXH6/YoTcbL//gcHzx3zUEwbRsc5tIKFkBn1f8rNOZP0ezSen/R75/38JtHYPs2QEggifqEkXFrCCLh6gY5bV1pzmr04jwteAfFsevUCHVcvSB7Lb8/UZg2/E0LXLw6CSAUJUjEKOsPbH/r4yd5KvOSc7k0eYiF+4WoLNyy9uFRkAN4dCvDy+x7cGd6uMjD4nOP3Az4s+vWVg34SCRgak+aDLGjAgeEAb33oz+hsrwYc13eZ+PxVcTTOuB8HjJfMOG3knlM1vHDCmzW5cdEACtpUG3NehKFSGdgvZ5TLy5rWhkiyUZKub2Qu19/14G7w9pviZVvKB5Mjdm/MFAQeREBXWcN3tpTwmSvj2fGXR1x4Icefb7KxaZGB72wt4cx4mJhCUoqEGEPke9D53MLnsrbJGknbftrrRe+XZkgJmFENRRbChSbtTWswzdscjliQf7qiiNtXx7Pj7wd8PNxbxVgtwlULdOxYbmHH8gLeHizikd5xuOH0Acu6xqSklgTTUGQBCpy2YcmABCkBi3toK2r4wE2/BIw4sKiooauswdAmT7ghB5aUNNyzvojFRQ1+BPQO+SgZDAVNw8HhAJ9ZWkDJZLhzTRED4xEOjwYwL1EkAxABGBiPMOREqd0ejDG0FTUUIjddQwQAEqQU7KCKjiLDBzUdSLnboxZydHcauG9zCQstNmk3RxhxdNgaVrTqF/792SsL2LrYBGNAi8kw8eJ0S4eBH2wv4+x4OKlcucbiPh494ODpI2767AGajk4bsENFiwddZkwRpOw1syhpbda0fktROOc4ORbiH14fw4FKetdHyOP9jJ/uMlE2Z793S2fYuGjyTzhxOwzAylYdK1unH9Pzxzw5WeM0HV1l4Eff/y4e+vu/mXI4rQ2f1o+Ztj9R0j6vNENK4KoWHctadLBBPfWStaAzvPOhj3/cO1Z3ewBuCGxsN3DbagudtoZRL8JzxzzsH568HAViG3N9u4FbV8Xnnq9xPHvUxb7Bi7l0Qh7bnjLiXJmmY1mZY1mZwqJlQIKUAGPAilYd3BkDmJZqT2RBAw6NhOgdCsAR25SGBnz/2jIW1GfMV07W8E//V8H7Y1NTcgQRR1dJh6kB39xoo2wyDFQj/OIPLqo+v1A2wNIZClrKN61MA3fGsKK1heICJEF/1iSxrs3A2jYdTE/3N44jFmDZZGip+xVvW2nh3k02igZD30iAxw45+KAaod3S0FI/b+LTZmn4yI3wRJ+D/cNxouVvbbTx5TUWCjounGemFSPi0gLr2uMPIYcpOXWSEN3fJrqfLO1+RdH9cDJyqvT09GBrh4HNi00w0xIe80zUQo7VrTruqSdJ9kKOJ/tcvH7Whz3LctM2Gd74IN7MXPV5/c2sjQ3tBjyJ6caZaWHzIgObFxvzzqmTdr+s6P7dtP2J7pcU3T9JM6Qk2iwNWzsMwK3Ey9aUcB4HB3x5TRFfWF4AALx8ooZfHnURRHzWJeKFGiFHPbx4ol4jZFkBf7Y2XY2QyZ1ogFvB1g4T7RY9RrKgb1Ii25eY2NZhSJklJwrkfK1eIOfouRD/0efg+Bzz40zUCHm8z8Xh0QDapTVCJJQnZ6aFbR06rruClqsyIUFKpLvDwA1dJhBFmGflDAAXC+TcUy+QE0TAf/Y7+O1psfw4RYPhtbMTNUKAVa1xjZDlrTpqqaZJBkQRblxaQHcnCVImiTl10tqYaa8X/aTNuZPEbPejMYbPX2VhdUs471lyokDO7asuFsj59UkPu+vxqiKRNRNBALsPu3jlZLx03TFRI4TNP6qImRZWlwPctKwAbZr9iCLff9ocOaI2WtY2bVpohpTMDUtN7FheAKJgXnsEnYDjuiVxgZyyGS87Hzvk4MhoOC+/oaUzHDkXp4M8ORbCNhi+tq6I7UtMOPNZujIGRAH+ZHkhXg0QUiFBSkZnsZti2yIGVhBL/BREiNM7rrexrcMAr6dy3HO6lsqJX9QZ9pyu4ekjcbzplsUG7lpXxJKEGiHTwQolbGsHbl9VnBSSR8iBBJkB3Z0m7lxThB06Qn7JiHPcusLC7fWs4/9zuoZd/S7G/XS5bzQGVGocu/pd/OZ0XCPktlUWvrjSQiiwDGO6ATus4qvr4lIGhHym5NTJOpY07fEkRMeftv+Z2r9jtYXeIR+7j0dz2ifpBByf6jRxzwYbbZaGs+MRHjsUp3tMXz4ufsHz3kcBHu9zsL7duJBouXcwmBRWNyOMAUzDLSsNfGnV/DPMyf59RUn7fCSRVk80Q2bEYlvDfZttdLdzsML0CacmCDnQVdbxV1tL2L4knnl2H3Hxyvue1BIAps7w8vs1PHM0Xrp+usvEX26xsaQ0tUZII6wQ38t9W0pYbNNjkxX0zjpDujtN/G23jZ/sreAsLwG+M+NfXEuL60sOuxGGnQi/PunhvM+llgHQGTDqRnjskIsPnQhtloaj54K66KcfF2MMMG1caXq4/5oWbOugRyZL6NvNmJtXFDHkcDz4ZgXnTAvM96aIUmfAQDXCowerCKLY5rN0BluXlPPmEmyD4eBHPt4e9BHxOF2IpU+fPSAWo4WFzMH917Rgx3J5YYHE9DAuuEiWZWPNdL2MHDci7adtby44AcfP33Pw0L4qzvMCMI0oVWNCjK2shu9127h3c0mKLZv1O4a0+xlFkf3OgoyBHLANhm9vsvG9a0pYyDzAnN2mVALTxkLm4XvdNr69SY4YiWRoyZoTJYPh3k02SgbDw73jOMtK4DVHvfSJjIEVLtqMX11bJDHmCC1Zc1iyXkrIgZdOuHi4t4p3R+LNzFlUXZ4PTDcApqG7neP+a0rYsdySk5nu0j5oyTrr+VMEmfaGZD/gWf9Asv+gzJXeQR//9p6L5495cHQbvFZt3mzJ4qgiO6zilpUW7ttiY1vH/Bz/sv2+efuR0/odGxHtnwTZJEECwLAT4ZljHnb1O3h3BIBmgPseJKUwngMsDoKPAmxrB766zsaXVlmp/IwkyMmQIC8jQU7QO+jj2WMe/vukh6MVA9C0WJgpcvPMCtPqQoywuhxgxwoLt620pITDkSAnQ4K8DAUJxMmpfj/gY8/pGl4/66N30AezF4D7XmxjphUn08D0+uZpdwzbOgzcuLSAm5YVcOPSgjRbkQQ5GemCzCrWU1b7Sch+qTQdO3fuxAMPPCB83XREnKN3KMAbAz4OfBTg4HCA/pEgFmcUxmXTozAeN4+m2p31mFPGWFwiT9PBtDgj3rp2A5sXGdjaYeC6K0x0dxpT9jPOl56eHuzcuTPz2OWsf8+8n8fG9sjtoRgaY7i208S1nSZGvQj7hwIcHg1w4nyA0+MRBsZDDDoRRt24crFWsOL6jAAQhoh8D0UWoK2oodMGusrAsjLHitaWWJCLDcqBozAkSAm8+uqrF/67cabs6emZ9O+kmXS68z+7rADOgVOV8IIgz3kcFZ/juZd+fXEjNOfQeVz4phC5sMMqfvT972JZWZtxr3Rjf0nMdH+XfgfE/KElq2Q/Vt42TdY2clJ7eW+3+8QtWZM6zNuRL0qzXxrJvp8kRH+PvF5SzbW9tP3JfgmUdH4jotdTLCtBXEaQIAlCIUiQBKEQqV/qNKK6YzfvlyZJqBZMn9S+bGTbrFnb8LK/j8bx0QxJEApBgiQIhSBBEoRCSA8ubyRrP1wSWW9ozdtxn7dNpHpgQhJZ+6WTEO2PZkiCUAgSJEEoBAmSIBQisbZHEnknJUprk2Rt81xuweFJx2UHZ6c9X7ZfOO/Y4yRohiQIhSBBEoRCkCAJQiGm7IfMe8Nps/c/ih6X7cdMS7Nt9kZE28/bhk5qX/bzK3p/NEMShEKQIAlCIUiQBKEQRt5+o2bHfmadZEk2zbaxPm6xzaJkvT+YYlkJQmFIkAShECRIglAI4czlqscSNjunTrNjP7P2SyaR9f7OrP2ozc67SzMkQSgECZIgFIIESRAKkVjbI21ti6T2RZHt90x7fdaxv6Lfb7OL54iStU2Y1J9smzptLCzNkAShECRIglAIEiRBKESiHzLvenpJ52dtE8q+3ySanSc261hf2fthVasn2kja+6EZkiAUggRJEApBgiQIhWAAJi16s94vmLeNJns/W9r+RdvPuzZJs7+vJPKuT5qE7P5ohiQIhSBBEoRCkCAJQiES87KKHm/2fkTR40nnN9vGTSLrWFPR/pLI+vfM2s+ddS0VmiEJQiFIkAShECRIglAIxjN2HDXbr9Ps/Xx5+8VEabbNnETe+1HTQrGsBPExggRJEApBgiQIhRDOyypK3n6drK+XbdOmbT+JrG2srG3CvI+n/X7Tfp80QxKEQpAgCUIhSJAEoRBG3vUOk3K4JCE7VjHr2M8kZNtwaWNhZR9vJO9YVtmxt1nnAKIZkiAUggRJEApBgiQIhUis7ZGWrPOMpu0v67yzWduseec1zTq2OOv9iaLk/fvQDEkQCkGCJAiFIEEShEIkxrLmHWsqm7z3FzYiOxY06zysSednnaOnEdn1GmWfL0qSjUwzJEEoBAmSIBSCBEkQCpH5fsgkmu33kx372Gy/nmj7ouQdKyrbj5t3rQ/R8dAMSRAKQYIkCIUgQRKEQjTdhhSNbUxLs/PEJp3fiOzY2GbvJ827vWYjer80QxKEQpAgCUIhSJAEoRCJNmTea3LVat5n7ae83GJZm21TJiHq10w7nrT3T7GsBKEwJEiCUAgSJEEoBAOQq5GYdQ6YvOsBNpK33yxrm1L2/eRto8n2A4ten9Qe2ZAEoTAkSIJQCBIkQSjE/wPwkiz2OLyp2wAAAABJRU5ErkJggg==",
    "amount": "0.133003449",
    "amount_raw": "133003449000000000000000000000",
    "subtotal": "0.122",
    "shipping": "0.011",
    "currency": "NANO",
    "address": "nano_37y6iq8m1zx9inwkkcgqh34kqsihzpjfwgp9jir8xpb9jrcwhkmoxpo61f4o"
  }

}

export async function onRequest(ctx) {

  // POST: https://nano.to/api
  const response = Response.json({ 
    checkout: checkout(),
    body: ctx.request.json()
    // request: JSON.parse(JSON.stringify(ctx)),
  });

  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Headers", "*")
  response.headers.set("Access-Control-Allow-Methods", "HEAD,POST,OPTIONS")

  return response;

}
