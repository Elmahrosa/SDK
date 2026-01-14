/**
 * Governance primitives (SDK-side).
 * For authoritative execution, call Elmahrosa-API governance endpoints.
 */
export class Governance {
  constructor() {
    this.petitions = [];
    this.proposals = [];
  }

  createPetition({ title, creator, threshold = 100, body, tags = [] }) {
    if (!title) throw new Error("Governance.createPetition: title required");
    if (!creator) throw new Error("Governance.createPetition: creator required");
    const petition = {
      id: `pet_${Date.now()}`,
      title,
      creator,
      body,
      tags,
      votes: 0,
      threshold,
      createdAt: new Date().toISOString()
    };
    this.petitions.push(petition);
    return petition;
  }

  votePetition({ id }) {
    const p = this.petitions.find(x => x.id === id);
    if (!p) throw new Error("Governance.votePetition: petition not found");
    p.votes += 1;
    const reached = p.votes >= p.threshold;
    return { petition: p, reached };
  }

  createProposal({ title, creator, payload, schemaRef }) {
    if (!title) throw new Error("Governance.createProposal: title required");
    if (!creator) throw new Error("Governance.createProposal: creator required");
    if (typeof payload !== "object" || payload === null) throw new Error("Governance.createProposal: payload object required");
    const proposal = {
      id: `prop_${Date.now()}`,
      title,
      creator,
      schemaRef,
      payload,
      createdAt: new Date().toISOString()
    };
    this.proposals.push(proposal);
    return proposal;
  }
}
