// Define a configuração padrão das tabelas

function padraoTB(typedTableNm) {
    return {
        timestamps: false,
        freezeTableName: true,
        tableName: typedTableNm
    }
}

module.exports = {
    padraoTB
}