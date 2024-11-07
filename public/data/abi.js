const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "NewMemeProposal",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_supply", type: "uint256" },
      { internalType: "string", name: "_memeStory", type: "string" },
      { internalType: "string", name: "_logo", type: "string" },
      {
        components: [
          { internalType: "string", name: "X", type: "string" },
          { internalType: "string", name: "website", type: "string" },
        ],
        internalType: "struct MemeBuilder.SocialChannel",
        name: "_socialChannel",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "platformFeeRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "communityDropRate",
            type: "uint256",
          },
          { internalType: "uint256", name: "liquidityRate", type: "uint256" },
          { internalType: "uint256", name: "investorRate", type: "uint256" },
          { internalType: "uint256", name: "ownerRate", type: "uint256" },
          {
            internalType: "uint256",
            name: "communityTreasuryRate",
            type: "uint256",
          },
        ],
        internalType: "struct MemeBuilder.MemeRequirement",
        name: "_memeRequirement",
        type: "tuple",
      },
    ],
    name: "createMemeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "status", type: "string" }],
    name: "getMemeProposalsByStatus",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "supply", type: "uint256" },
          { internalType: "string", name: "memeStory", type: "string" },
          { internalType: "string", name: "logo", type: "string" },
          { internalType: "string", name: "status", type: "string" },
          {
            components: [
              { internalType: "string", name: "X", type: "string" },
              { internalType: "string", name: "website", type: "string" },
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "uint256",
                name: "platformFeeRate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "communityDropRate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256",
              },
              { internalType: "uint256", name: "ownerRate", type: "uint256" },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256",
              },
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple",
          },
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default abi;
