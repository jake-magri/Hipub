import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JakeMagri', email: 'jake.magri@hipub.com', password: 'password' },
    { username: 'ParsaMcMoody', email: 'parsa.mcmoody@hipub.com', password: 'password' },
    { username: 'BrendanMurfield', email: 'brendan.murfield@hipub.com', password: 'password' },
    { username: 'LiamOSullivan', email: 'liam.osullivan@hipub.com', password: 'password' },
    { username: 'AoifeMurphy', email: 'aoife.murphy@hipub.com', password: 'password' },
    { username: 'CianByrne', email: 'cian.byrne@hipub.com', password: 'password' },
    { username: 'NiamhWalsh', email: 'niamh.walsh@hipub.com', password: 'password' },
    { username: 'SeanOConnor', email: 'sean.oconnor@hipub.com', password: 'password' },
    { username: 'EmilyRyan', email: 'emily.ryan@hipub.com', password: 'password' },
    { username: 'ConorKelly', email: 'conor.kelly@hipub.com', password: 'password' },
    { username: 'MaeveDoyle', email: 'maeve.doyle@hipub.com', password: 'password' },
    { username: 'PatrickOBrien', email: 'patrick.obrien@hipub.com', password: 'password' },
    { username: 'OrlaithGallagher', email: 'orlaith.gallagher@hipub.com', password: 'password' },
    { username: 'FionnFitzgerald', email: 'fionn.fitzgerald@hipub.com', password: 'password' },
    { username: 'SaoirseKeane', email: 'saoirse.keane@hipub.com', password: 'password' },
    { username: 'AidanSmith', email: 'aidan.smith@hipub.com', password: 'password' },
    { username: 'GrainneHughes', email: 'grainne.hughes@hipub.com', password: 'password' },
    { username: 'EoinMcCarthy', email: 'eoin.mccarthy@hipub.com', password: 'password' },
    { username: 'SiobhanLynch', email: 'siobhan.lynch@hipub.com', password: 'password' },
    { username: 'BrendanFarrell', email: 'brendan.farrell@hipub.com', password: 'password' },
    { username: 'RoisinFoley', email: 'roisin.foley@hipub.com', password: 'password' },
    { username: 'DeclanHealy', email: 'declan.healy@hipub.com', password: 'password' },
    { username: 'AislingDunne', email: 'aisling.dunne@hipub.com', password: 'password' }
  ], { individualHooks: true });
};
