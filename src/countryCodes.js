const countries = [
  { id: 1, name: "Afghanistan", code: "AF", phone: 93 },
  { id: 2, name: "Aland Islands", code: "AX", phone: 358 },
  { id: 3, name: "Albania", code: "AL", phone: 355 },
  { id: 4, name: "Algeria", code: "DZ", phone: 213 },
  { id: 5, name: "American Samoa", code: "AS", phone: 1684 },
  { id: 6, name: "Andorra", code: "AD", phone: 376 },
  { id: 7, name: "Angola", code: "AO", phone: 244 },
  { id: 8, name: "Anguilla", code: "AI", phone: 1264 },
  { id: 9, name: "Antarctica", code: "AQ", phone: 672 },
  { id: 10, name: "Antigua and Barbuda", code: "AG", phone: 1268 },
  { id: 11, name: "Argentina", code: "AR", phone: 54 },
  { id: 12, name: "Armenia", code: "AM", phone: 374 },
  { id: 13, name: "Aruba", code: "AW", phone: 297 },
  { id: 14, name: "Australia", code: "AU", phone: 61 },
  { id: 15, name: "Austria", code: "AT", phone: 43 },
  { id: 16, name: "Azerbaijan", code: "AZ", phone: 994 },
  { id: 17, name: "Bahamas", code: "BS", phone: 1242 },
  { id: 18, name: "Bahrain", code: "BH", phone: 973 },
  { id: 19, name: "Bangladesh", code: "BD", phone: 880 },
  { id: 20, name: "Barbados", code: "BB", phone: 1246 },
  { id: 21, name: "Belarus", code: "BY", phone: 375 },
  { id: 22, name: "Belgium", code: "BE", phone: 32 },
  { id: 23, name: "Belize", code: "BZ", phone: 501 },
  { id: 24, name: "Benin", code: "BJ", phone: 229 },
  { id: 25, name: "Bermuda", code: "BM", phone: 1441 },
  { id: 26, name: "Bhutan", code: "BT", phone: 975 },
  { id: 27, name: "Bolivia", code: "BO", phone: 591 },
  { id: 28, name: "Bonaire, Sint Eustatius and Saba", code: "BQ", phone: 599 },
  { id: 29, name: "Bosnia and Herzegovina", code: "BA", phone: 387 },
  { id: 30, name: "Botswana", code: "BW", phone: 267 },
  { id: 31, name: "Bouvet Island", code: "BV", phone: 55 },
  { id: 32, name: "Brazil", code: "BR", phone: 55 },
  { id: 33, name: "British Indian Ocean Territory", code: "IO", phone: 246 },
  { id: 34, name: "Brunei Darussalam", code: "BN", phone: 673 },
  { id: 35, name: "Bulgaria", code: "BG", phone: 359 },
  { id: 36, name: "Burkina Faso", code: "BF", phone: 226 },
  { id: 37, name: "Burundi", code: "BI", phone: 257 },
  { id: 38, name: "Cambodia", code: "KH", phone: 855 },
  { id: 39, name: "Cameroon", code: "CM", phone: 237 },
  { id: 40, name: "Canada", code: "CA", phone: 1 },
  { id: 41, name: "Cape Verde", code: "CV", phone: 238 },
  { id: 42, name: "Cayman Islands", code: "KY", phone: 1345 },
  { id: 43, name: "Central African Republic", code: "CF", phone: 236 },
  { id: 44, name: "Chad", code: "TD", phone: 235 },
  { id: 45, name: "Chile", code: "CL", phone: 56 },
  { id: 46, name: "China", code: "CN", phone: 86 },
  { id: 47, name: "Christmas Island", code: "CX", phone: 61 },
  { id: 48, name: "Cocos (Keeling) Islands", code: "CC", phone: 672 },
  { id: 49, name: "Colombia", code: "CO", phone: 57 },
  { id: 50, name: "Comoros", code: "KM", phone: 269 },
  { id: 51, name: "Congo", code: "CG", phone: 242 },
  {
    id: 52,
    name: "Congo, Democratic Republic of the Congo",
    code: "CD",
    phone: 242,
  },
  { id: 53, name: "Cook Islands", code: "CK", phone: 682 },
  { id: 54, name: "Costa Rica", code: "CR", phone: 506 },
  { id: 55, name: "Cote D'Ivoire", code: "CI", phone: 225 },
  { id: 56, name: "Croatia", code: "HR", phone: 385 },
  { id: 57, name: "Cuba", code: "CU", phone: 53 },
  { id: 58, name: "Curacao", code: "CW", phone: 599 },
  { id: 59, name: "Cyprus", code: "CY", phone: 357 },
  { id: 60, name: "Czech Republic", code: "CZ", phone: 420 },
  { id: 61, name: "Denmark", code: "DK", phone: 45 },
  { id: 62, name: "Djibouti", code: "DJ", phone: 253 },
  { id: 63, name: "Dominica", code: "DM", phone: 1767 },
  { id: 64, name: "Dominican Republic", code: "DO", phone: 1809 },
  { id: 65, name: "Ecuador", code: "EC", phone: 593 },
  { id: 66, name: "Egypt", code: "EG", phone: 20 },
  { id: 67, name: "El Salvador", code: "SV", phone: 503 },
  { id: 68, name: "Equatorial Guinea", code: "GQ", phone: 240 },
  { id: 69, name: "Eritrea", code: "ER", phone: 291 },
  { id: 70, name: "Estonia", code: "EE", phone: 372 },
  { id: 71, name: "Ethiopia", code: "ET", phone: 251 },
  { id: 72, name: "Falkland Islands (Malvinas)", code: "FK", phone: 500 },
  { id: 73, name: "Faroe Islands", code: "FO", phone: 298 },
  { id: 74, name: "Fiji", code: "FJ", phone: 679 },
  { id: 75, name: "Finland", code: "FI", phone: 358 },
  { id: 76, name: "France", code: "FR", phone: 33 },
  { id: 77, name: "French Guiana", code: "GF", phone: 594 },
  { id: 78, name: "French Polynesia", code: "PF", phone: 689 },
  { id: 79, name: "French Southern Territories", code: "TF", phone: 262 },
  { id: 80, name: "Gabon", code: "GA", phone: 241 },
  { id: 81, name: "Gambia", code: "GM", phone: 220 },
  { id: 82, name: "Georgia", code: "GE", phone: 995 },
  { id: 83, name: "Germany", code: "DE", phone: 49 },
  { id: 84, name: "Ghana", code: "GH", phone: 233 },
  { id: 85, name: "Gibraltar", code: "GI", phone: 350 },
  { id: 86, name: "Greece", code: "GR", phone: 30 },
  { id: 87, name: "Greenland", code: "GL", phone: 299 },
  { id: 88, name: "Grenada", code: "GD", phone: 1473 },
  { id: 89, name: "Guadeloupe", code: "GP", phone: 590 },
  { id: 90, name: "Guam", code: "GU", phone: 1671 },
  { id: 91, name: "Guatemala", code: "GT", phone: 502 },
  { id: 92, name: "Guernsey", code: "GG", phone: 44 },
  { id: 93, name: "Guinea", code: "GN", phone: 224 },
  { id: 94, name: "Guinea-Bissau", code: "GW", phone: 245 },
  { id: 95, name: "Guyana", code: "GY", phone: 592 },
  { id: 96, name: "Haiti", code: "HT", phone: 509 },
  { id: 97, name: "Heard Island and McDonald Islands", code: "HM", phone: 0 },
  { id: 98, name: "Holy See (Vatican City State)", code: "VA", phone: 39 },
  { id: 99, name: "Honduras", code: "HN", phone: 504 },
  { id: 100, name: "Hong Kong", code: "HK", phone: 852 },
  { id: 101, name: "Hungary", code: "HU", phone: 36 },
  { id: 102, name: "Iceland", code: "IS", phone: 354 },
  { id: 103, name: "India", code: "IN", phone: 91 },
  { id: 104, name: "Indonesia", code: "ID", phone: 62 },
  { id: 105, name: "Iran, Islamic Republic of", code: "IR", phone: 98 },
  { id: 106, name: "Iraq", code: "IQ", phone: 964 },
  { id: 107, name: "Ireland", code: "IE", phone: 353 },
  { id: 108, name: "Isle of Man", code: "IM", phone: 44 },
  { id: 109, name: "Israel", code: "IL", phone: 972 },
  { id: 110, name: "Italy", code: "IT", phone: 39 },
  { id: 111, name: "Jamaica", code: "JM", phone: 1876 },
  { id: 112, name: "Japan", code: "JP", phone: 81 },
  { id: 113, name: "Jersey", code: "JE", phone: 44 },
  { id: 114, name: "Jordan", code: "JO", phone: 962 },
  { id: 115, name: "Kazakhstan", code: "KZ", phone: 7 },
  { id: 116, name: "Kenya", code: "KE", phone: 254 },
  { id: 117, name: "Kiribati", code: "KI", phone: 686 },
  {
    id: 118,
    name: "Korea, Democratic People's Republic of",
    code: "KP",
    phone: 850,
  },
  { id: 119, name: "Korea, Republic of", code: "KR", phone: 82 },
  { id: 120, name: "Kosovo", code: "XK", phone: 383 },
  { id: 121, name: "Kuwait", code: "KW", phone: 965 },
  { id: 122, name: "Kyrgyzstan", code: "KG", phone: 996 },
  { id: 123, name: "Lao People's Democratic Republic", code: "LA", phone: 856 },
  { id: 124, name: "Latvia", code: "LV", phone: 371 },
  { id: 125, name: "Lebanon", code: "LB", phone: 961 },
  { id: 126, name: "Lesotho", code: "LS", phone: 266 },
  { id: 127, name: "Liberia", code: "LR", phone: 231 },
  { id: 128, name: "Libyan Arab Jamahiriya", code: "LY", phone: 218 },
  { id: 129, name: "Liechtenstein", code: "LI", phone: 423 },
  { id: 130, name: "Lithuania", code: "LT", phone: 370 },
  { id: 131, name: "Luxembourg", code: "LU", phone: 352 },
  { id: 132, name: "Macao", code: "MO", phone: 853 },
  {
    id: 133,
    name: "Macedonia, the Former Yugoslav Republic of",
    code: "MK",
    phone: 389,
  },
  { id: 134, name: "Madagascar", code: "MG", phone: 261 },
  { id: 135, name: "Malawi", code: "MW", phone: 265 },
  { id: 136, name: "Malaysia", code: "MY", phone: 60 },
  { id: 137, name: "Maldives", code: "MV", phone: 960 },
  { id: 138, name: "Mali", code: "ML", phone: 223 },
  { id: 139, name: "Malta", code: "MT", phone: 356 },
  { id: 140, name: "Marshall Islands", code: "MH", phone: 692 },
  { id: 141, name: "Martinique", code: "MQ", phone: 596 },
  { id: 142, name: "Mauritania", code: "MR", phone: 222 },
  { id: 143, name: "Mauritius", code: "MU", phone: 230 },
  { id: 144, name: "Mayotte", code: "YT", phone: 262 },
  { id: 145, name: "Mexico", code: "MX", phone: 52 },
  { id: 146, name: "Micronesia, Federated States of", code: "FM", phone: 691 },
  { id: 147, name: "Moldova, Republic of", code: "MD", phone: 373 },
  { id: 148, name: "Monaco", code: "MC", phone: 377 },
  { id: 149, name: "Mongolia", code: "MN", phone: 976 },
  { id: 150, name: "Montenegro", code: "ME", phone: 382 },
  { id: 151, name: "Montserrat", code: "MS", phone: 1664 },
  { id: 152, name: "Morocco", code: "MA", phone: 212 },
  { id: 153, name: "Mozambique", code: "MZ", phone: 258 },
  { id: 154, name: "Myanmar", code: "MM", phone: 95 },
  { id: 155, name: "Namibia", code: "NA", phone: 264 },
  { id: 156, name: "Nauru", code: "NR", phone: 674 },
  { id: 157, name: "Nepal", code: "NP", phone: 977 },
  { id: 158, name: "Netherlands", code: "NL", phone: 31 },
  { id: 159, name: "Netherlands Antilles", code: "AN", phone: 599 },
  { id: 160, name: "New Caledonia", code: "NC", phone: 687 },
  { id: 161, name: "New Zealand", code: "NZ", phone: 64 },
  { id: 162, name: "Nicaragua", code: "NI", phone: 505 },
  { id: 163, name: "Niger", code: "NE", phone: 227 },
  { id: 164, name: "Nigeria", code: "NG", phone: 234 },
  { id: 165, name: "Niue", code: "NU", phone: 683 },
  { id: 166, name: "Norfolk Island", code: "NF", phone: 672 },
  { id: 167, name: "Northern Mariana Islands", code: "MP", phone: 1670 },
  { id: 168, name: "Norway", code: "NO", phone: 47 },
  { id: 169, name: "Oman", code: "OM", phone: 968 },
  { id: 170, name: "Pakistan", code: "PK", phone: 92 },
  { id: 171, name: "Palau", code: "PW", phone: 680 },
  { id: 172, name: "Palestinian Territory, Occupied", code: "PS", phone: 970 },
  { id: 173, name: "Panama", code: "PA", phone: 507 },
  { id: 174, name: "Papua New Guinea", code: "PG", phone: 675 },
  { id: 175, name: "Paraguay", code: "PY", phone: 595 },
  { id: 176, name: "Peru", code: "PE", phone: 51 },
  { id: 177, name: "Philippines", code: "PH", phone: 63 },
  { id: 178, name: "Pitcairn", code: "PN", phone: 64 },
  { id: 179, name: "Poland", code: "PL", phone: 48 },
  { id: 180, name: "Portugal", code: "PT", phone: 351 },
  { id: 181, name: "Puerto Rico", code: "PR", phone: 1787 },
  { id: 182, name: "Qatar", code: "QA", phone: 974 },
  { id: 183, name: "Reunion", code: "RE", phone: 262 },
  { id: 184, name: "Romania", code: "RO", phone: 40 },
  { id: 185, name: "Russian Federation", code: "RU", phone: 7 },
  { id: 186, name: "Rwanda", code: "RW", phone: 250 },
  { id: 187, name: "Saint Barthelemy", code: "BL", phone: 590 },
  { id: 188, name: "Saint Helena", code: "SH", phone: 290 },
  { id: 189, name: "Saint Kitts and Nevis", code: "KN", phone: 1869 },
  { id: 190, name: "Saint Lucia", code: "LC", phone: 1758 },
  { id: 191, name: "Saint Martin", code: "MF", phone: 590 },
  { id: 192, name: "Saint Pierre and Miquelon", code: "PM", phone: 508 },
  {
    id: 193,
    name: "Saint Vincent and the Grenadines",
    code: "VC",
    phone: 1784,
  },
  { id: 194, name: "Samoa", code: "WS", phone: 684 },
  { id: 195, name: "San Marino", code: "SM", phone: 378 },
  { id: 196, name: "Sao Tome and Principe", code: "ST", phone: 239 },
  { id: 197, name: "Saudi Arabia", code: "SA", phone: 966 },
  { id: 198, name: "Senegal", code: "SN", phone: 221 },
  { id: 199, name: "Serbia", code: "RS", phone: 381 },
  { id: 200, name: "Serbia and Montenegro", code: "CS", phone: 381 },
  { id: 201, name: "Seychelles", code: "SC", phone: 248 },
  { id: 202, name: "Sierra Leone", code: "SL", phone: 232 },
  { id: 203, name: "Singapore", code: "SG", phone: 65 },
  { id: 204, name: "St Martin", code: "SX", phone: 721 },
  { id: 205, name: "Slovakia", code: "SK", phone: 421 },
  { id: 206, name: "Slovenia", code: "SI", phone: 386 },
  { id: 207, name: "Solomon Islands", code: "SB", phone: 677 },
  { id: 208, name: "Somalia", code: "SO", phone: 252 },
  { id: 209, name: "South Africa", code: "ZA", phone: 27 },
  {
    id: 210,
    name: "South Georgia and the South Sandwich Islands",
    code: "GS",
    phone: 500,
  },
  { id: 211, name: "South Sudan", code: "SS", phone: 211 },
  { id: 212, name: "Spain", code: "ES", phone: 34 },
  { id: 213, name: "Sri Lanka", code: "LK", phone: 94 },
  { id: 214, name: "Sudan", code: "SD", phone: 249 },
  { id: 215, name: "Suriname", code: "SR", phone: 597 },
  { id: 216, name: "Svalbard and Jan Mayen", code: "SJ", phone: 47 },
  { id: 217, name: "Swaziland", code: "SZ", phone: 268 },
  { id: 218, name: "Sweden", code: "SE", phone: 46 },
  { id: 219, name: "Switzerland", code: "CH", phone: 41 },
  { id: 220, name: "Syrian Arab Republic", code: "SY", phone: 963 },
  { id: 221, name: "Taiwan, Province of China", code: "TW", phone: 886 },
  { id: 222, name: "Tajikistan", code: "TJ", phone: 992 },
  { id: 223, name: "Tanzania, United Republic of", code: "TZ", phone: 255 },
  { id: 224, name: "Thailand", code: "TH", phone: 66 },
  { id: 225, name: "Timor-Leste", code: "TL", phone: 670 },
  { id: 226, name: "Togo", code: "TG", phone: 228 },
  { id: 227, name: "Tokelau", code: "TK", phone: 690 },
  { id: 228, name: "Tonga", code: "TO", phone: 676 },
  { id: 229, name: "Trinidad and Tobago", code: "TT", phone: 1868 },
  { id: 230, name: "Tunisia", code: "TN", phone: 216 },
  { id: 231, name: "Turkey", code: "TR", phone: 90 },
  { id: 232, name: "Turkmenistan", code: "TM", phone: 7370 },
  { id: 233, name: "Turks and Caicos Islands", code: "TC", phone: 1649 },
  { id: 234, name: "Tuvalu", code: "TV", phone: 688 },
  { id: 235, name: "Uganda", code: "UG", phone: 256 },
  { id: 236, name: "Ukraine", code: "UA", phone: 380 },
  { id: 237, name: "United Arab Emirates", code: "AE", phone: 971 },
  { id: 238, name: "United Kingdom", code: "GB", phone: 44 },
  { id: 239, name: "United States", code: "US", phone: 1 },
  {
    id: 240,
    name: "United States Minor Outlying Islands",
    code: "UM",
    phone: 1,
  },
  { id: 241, name: "Uruguay", code: "UY", phone: 598 },
  { id: 242, name: "Uzbekistan", code: "UZ", phone: 998 },
  { id: 243, name: "Vanuatu", code: "VU", phone: 678 },
  { id: 244, name: "Venezuela", code: "VE", phone: 58 },
  { id: 245, name: "Viet Nam", code: "VN", phone: 84 },
  { id: 246, name: "Virgin Islands, British", code: "VG", phone: 1284 },
  { id: 247, name: "Virgin Islands, U.s.", code: "VI", phone: 1340 },
  { id: 248, name: "Wallis and Futuna", code: "WF", phone: 681 },
  { id: 249, name: "Western Sahara", code: "EH", phone: 212 },
  { id: 250, name: "Yemen", code: "YE", phone: 967 },
  { id: 251, name: "Zambia", code: "ZM", phone: 260 },
  { id: 252, name: "Zimbabwe", code: "ZW", phone: 263 },
];

export default countries;