const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "AccessControlBadConfirmation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "neededRole",
        type: "bytes32"
      }
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "NewMemeProposal",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "SetFailed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256"
      }
    ],
    name: "TokenCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "result",
        type: "string"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "Vote",
    type: "event"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "EXECUTOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      }
    ],
    name: "cleanMeme",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "communityTreasuryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "_supply",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "_memeStory",
        type: "string"
      },
      {
        internalType: "string",
        name: "_logo",
        type: "string"
      },
      {
        components: [
          {
            internalType: "string",
            name: "X",
            type: "string"
          },
          {
            internalType: "string",
            name: "website",
            type: "string"
          },
          {
            internalType: "string",
            name: "telegram",
            type: "string"
          }
        ],
        internalType: "struct MemeBuilder.SocialChannel",
        name: "_socialChannel",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "liquidityRate",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "investorRate",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "ownerRate",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "communityTreasuryRate",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeRequirement",
        name: "_memeRequirement",
        type: "tuple"
      }
    ],
    name: "createMemeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      }
    ],
    name: "getInvestingProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "status",
        type: "string"
      }
    ],
    name: "getMemeProposalsByStatus",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      }
    ],
    name: "getMentedMemes",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_address",
        type: "address"
      }
    ],
    name: "getMyInvestedProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "getMyProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_address",
        type: "address"
      }
    ],
    name: "getMyVotedProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      }
    ],
    name: "getVotingProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_page",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_pageSize",
        type: "uint256"
      }
    ],
    name: "getWaitingMintProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "supply",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "memeStory",
            type: "string"
          },
          {
            internalType: "string",
            name: "logo",
            type: "string"
          },
          {
            internalType: "string",
            name: "status",
            type: "string"
          },
          {
            components: [
              {
                internalType: "string",
                name: "X",
                type: "string"
              },
              {
                internalType: "string",
                name: "website",
                type: "string"
              },
              {
                internalType: "string",
                name: "telegram",
                type: "string"
              }
            ],
            internalType: "struct MemeBuilder.SocialChannel",
            name: "socialChannel",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "liquidityRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "investorRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "ownerRate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "communityTreasuryRate",
                type: "uint256"
              }
            ],
            internalType: "struct MemeBuilder.MemeRequirement",
            name: "memeRequirement",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "startVotingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startInvestmentAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "startVestingAt",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteYes",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "voteNo",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "risedAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumVoter",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "minimumInvestmentAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "maximumInvestmentAmount",
            type: "uint256"
          }
        ],
        internalType: "struct MemeBuilder.MemeProposal[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "voter",
        type: "address"
      }
    ],
    name: "hasAlreadyVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "invest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "investPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "investmentRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "isReadyToMint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      }
    ],
    name: "isVoteResultPassed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lpVaultAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "minimumVoter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "positionManagerAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "releaseTokenTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address"
      }
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "setCommunityTreasuryContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "setFactoryAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "period",
        type: "uint256"
      }
    ],
    name: "setInvestPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "setInvestmentRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "setLPVaultContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "voter",
        type: "uint256"
      }
    ],
    name: "setMinimumVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "setPositionManagerAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256"
      }
    ],
    name: "setReleaseTokenTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "setVestingContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "period",
        type: "uint256"
      }
    ],
    name: "setVotePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_voteRate",
        type: "uint256"
      }
    ],
    name: "setVoterRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "vestingAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "enum MemeBuilder.VoteResult",
        name: "result",
        type: "uint8"
      }
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "votePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "voterRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

export default abi;
