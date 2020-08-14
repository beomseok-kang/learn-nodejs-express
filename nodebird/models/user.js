const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 이메일
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            // 닉네임
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            // 비밀번호
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            // 인증 프로바이더 (로컬 로그인 또는 카카오 로그인)
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            // SNS 아이디
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        // user - post => 1:N
        db.User.hasMany(db.Post);
        // user - user (follower or following) => N:M
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow'
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        });
    }
}

module.exports = User;