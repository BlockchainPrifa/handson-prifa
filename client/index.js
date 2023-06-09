const { createApp } = Vue;

createApp({
    data() {
        return {
            message: "Hello Vue!",
            contractAddress: "0x6aebD9716a012956F3BaB4e70099E462A5407B63",
            delegasiAddressVoter: "",
            count: 0,
            token: null,
            newVoter: "",
            newVoterStatus: "",
            voterStatus: "",
            voterAddressToCheck: "",
            proposals: [],
            chairperson: "",
        };
    },
    methods: {
        async _initEthers() {
            const [selectedAddress] = await window.ethereum.enable();
            // ethers connection for the smartcontract
            const _provider = new ethers.providers.Web3Provider(window.ethereum);

            const _token = new ethers.Contract(
                this.contractAddress,
                ABI,
                _provider.getSigner()
            );
            // get the proposals
            const newProposal = await _token.getAllProposals();
            console.log(newProposal);

            // get the chairman address
            const newChairperson = await _token.chairperson();
            console.log(newChairperson);

            // // save the token data into a hook to reuse it along the app
            this.token = _token;
            this.proposals = newProposal;
            this.chairperson = newChairperson;
            this.proposals.map((item) => {
                console.log(item[1].toNumber());
            });
        },
        async voteProposal(proposal) {
            await this.token.vote(proposal);
        },
        async checkAddressVoter() {
            try {
                const voterData = await this.token.voters(this.voterAddressToCheck);
                console.log(voterData)
                this.voterStatus = voterData;
                console.log(this.voterStatus)
            } catch (err) {
                console.log(err);
                this.voterStatus = "An error has occured";
            }
        },
        async voteDelegation() {
            try {
                const delegasi = await this.token.delegate(this.delegasiAddressVoter);
                console.log(delegasi)
            } catch (err) {
                console.log(err);
            }
        },
        async addNewVoter() {
            try {
                await this.token.giveRightToVote(this.newVoter);
            } catch (err) {
                console.log(err);
            }
        },
        async reload() {
            this._initEthers()
            this.delegasiAddressVoter = ""
            this.voterAddressToCheck = ""
            this.newVoter = ""

        },
    },
    computed: {
        checkVote() {
            // `this` points to the component instance
            return this.voterStatus[1] ? 'sudah' : 'belum'
        }
    },
    mounted() {
        this._initEthers();
    },
}).mount("#app");
