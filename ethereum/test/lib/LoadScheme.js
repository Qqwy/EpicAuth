

function LoadScheme(demands){
    let demands = {
        "request": [
            {
                type: "email",
                optional: false,
                validated_by: [
                    {
                        site: "github.com",
                        address: 0xDEADBEEF
                    },
                    {
                        site: "google.com",
                        address: 0xCAFEBABE
                    }
                ]
            },
            {
                type: "phone",
                optional: true,
                validated_by: [
                    {
                        site: "github.com",
                        address: 0xDEADCAFE
                    },
                    {
                        site: "google.com",
                        address: 0xCAFEBABE
                    }
                ]
            }
        ],
        "title": "Login to Bithug website",
        "explanation": "You you want to use our service, please allow us to send you spam on your mail and maybe call you on inpropriate times."
    };

}
