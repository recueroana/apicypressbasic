/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    const body_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')

    const newDate = (new Date().toISOString().slice(0, 16))

    it( 'Cadastro de dispositivo', () => {
        cy.cadastrarDeviceEspecifico(body_cadastro_device)
        .then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 16)).equal(newDate)
            expect(response.body.name).equal('Novo cadastro de celular')
        })
    })

    it( 'Cadastro de dispositivo inexistente', () => {
        cy.cadastrarDeviceEspecifico()
        .then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })    
      
})