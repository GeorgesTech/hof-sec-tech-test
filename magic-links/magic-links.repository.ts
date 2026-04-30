type MagicLinkDatabaseDocument = {
  id: string;
  // TODO
}

const documents: MagicLinkDatabaseDocument[] = [];

export const magicLinksRepository = {
  async create(document: MagicLinkDatabaseDocument) {
    documents.push(document);
  },
}
