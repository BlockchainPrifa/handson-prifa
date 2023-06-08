const { createApp } = Vue;
console.log(ABI);
createApp({
    data() {
        return {
            message: "Hello Vue!",
            contractAddress: "0xdacffdC47269310CB7fEAa16274A1d426f5D1771",
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
        increment() {
            this.count++;
        },
        async _initEthers() {
            const [selectedAddress] = await window.ethereum.enable();
            // ethers connection for the smartcontract
            const _provider = new ethers.providers.Web3Provider(window.ethereum);

            const _token = new ethers.Contract(
                this.contractAddress,
                ABI,
                _provider.getSigner()
            );
            const data = 20;
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
            this.proposals.map(item => {
                console.log(item[1].toNumber())
            })
        },
        async voteProposal(proposal) {
            await this.token.vote(proposal);
        },
        async checkAddressVoter() {
            try {
                const voterData = await this.token.voters(`${voterAddressToCheck}`);
                this.voterStatus = voterData;
            } catch (err) {
                console.log(err);
                this.voterStatus = "An error has occured";
            }
        },
        async addNewVoter() {
            try {
                await this.token.giveRightToVote(newVoter);
                this.voterStatus = "Success";
            } catch (err) {
                console.log(err);
                this.voterStatus = "An error has occured";
            }
        },
    },
    computed: {},
    mounted() {
        // methods can be called in lifecycle hooks, or other methods!
        this.increment();
        this._initEthers();
    },
}).mount("#app");
