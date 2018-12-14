const {coverage} = require('../../src/providers/istanbul');

module.exports = () => {
	describe('Testing coverage values', () => {
		it('shold return orange with right percentage', () => {
			const json = {
      	"total": {
      		"lines":{
      			"total":720,
      			"covered":498,
      			"skipped":0,
      			"pct":69.27
      		}
      	}
      };
      writeReport(config, json);
			const badgeData = coverage(config);
			expect(badgeData).to.include({value: '69.27%', color: 'orange'});
		})

		it('shold return red with right percentage', () => {
			const json = {
      	"total": {
      		"lines":{
      			"total":720,
      			"covered":498,
      			"skipped":0,
      			"pct":39.27
      		}
      	}
      };
      writeReport(config, json);
			const badgeData = coverage(config);
			expect(badgeData).to.include({value: '39.27%', color: 'red'});
		})

		it('shold return green with right percentage', () => {
			const json = {
      	"total": {
      		"lines":{
      			"total":720,
      			"covered":498,
      			"skipped":0,
      			"pct":99.27
      		}
      	}
      };
      writeReport(config, json);
			const badgeData = coverage(config);
			expect(badgeData).to.include({value: '99.27%', color: 'green'});
		})
	}); 
}