contract('Service', function(accounts) {
  it('should contain one public key', function(){
    let service = Service();
    expect(service.public_key).to.equal('kaaskoekje');
  });
});
