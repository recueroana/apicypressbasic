/// <reference types="cypress"/>

describe('Alterando um  dispositivos', () => {
   
    const body_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')
    const body_update_device = require('../fixtures/alterar_device_sucesso.json')


    const newDate = (new Date().toISOString().slice(0, 16))

    it( 'Alterando dispositivo', () => {
        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro_device
        }).as('postDeviceResult')
      
        //validações POST
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)
            expect(response.body.name).equal('Novo cadastro de celular')
            expect(response.body.data.year).equal(2024)
            expect(response.body.data.price).equal(1549.99)
            expect(response.body.data['CPU model']).equal('Intel Core i9')
            expect(response.body.data['Hard disk size']).equal('Testando LTDA')
                   
            //FAZER O PUT
            cy.request({
                method: 'PUT',
                url: `/objects/${response.body.id}`,
                failOnStatusCode: false,
                body: body_update_device
            }).as('putDeviceResult') 


            //VALIDAÇÕES DO PUT
            cy.get('@putDeviceResult')
            .then((response_update) => {
                expect(response_update.status).equal(200)
                expect(response_update.body.name).equal('Novo Nome')
                expect(response.body.createdAt.slice(0, 16)).equal(newDate)
                expect(response_update.body.data.year).equal(2020)
                expect(response_update.body.data.price).equal(799.99)
                expect(response_update.body.data['CPU model']).equal('Mac Core i9')
                expect(response_update.body.data['Hard disk size']).equal('Testando LTDA')
            })
       })
    })
        
      
})