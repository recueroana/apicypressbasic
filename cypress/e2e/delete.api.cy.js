/// <reference types="cypress"/>

describe('Deletando dispositivos', () => {

    const body_cadastro_device = require('../fixtures/cadastrar_device_sucesso.json')

   it( 'Deletando um dispositivo', () => {

        cy.cadastrarDeviceEspecifico(body_cadastro_device)
        .then((response) => {
                expect(response.status).equal(200)
                      
            cy.request({
                method: 'DELETE',
                url: `/objects/${response.body.id}`,
                failOnStatusCode: false,
            }).as('deleteDeviceResult') 

            cy.get('@deleteDeviceResult')
            .then((response_del) => {
                expect(response_del.status).equal(200)
                expect(response_del.body.message)
                .equal(`Object with id = ${response.body.id} has been deleted.`)
            })
       })
    })

    it( 'Deletando um dispositivo inexistente', () => {        
        
        const id_inexistente = '5555'
            cy.request({
                method: 'DELETE',
                url: `/objects/${id_inexistente}`,
                failOnStatusCode: false,
            }).as('deleteDeviceResult') 

            cy.get('@deleteDeviceResult')
            .then((response_del) => {
                expect(response_del.status).equal(404)
                expect(response_del.body.error)
                .equal(`Object with id = ${id_inexistente} doesn't exist.`)
            })
   })        
      
   it( 'Deletando um dispositivo que não pode ser excluido', () => {        
        
    const id_reservado = '7'
        cy.request({
            method: 'DELETE',
            url: `/objects/${id_reservado}`,
            failOnStatusCode: false,
        }).as('deleteDeviceResult') 

        cy.get('@deleteDeviceResult')
        .then((response_del) => {
            expect(response_del.status).equal(405)
            expect(response_del.body.error)
            .equal(`${id_reservado} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)
        })
   })        
})