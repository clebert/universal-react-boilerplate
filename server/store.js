import ChildProcess from 'child_process';
import Promise from 'bluebird';

const exec = Promise.promisify(ChildProcess.exec);

export const loadData = function () {
    return exec('finger $USER | head -n1 | cut -d : -f3').then(function (stdout) {
        return {fullName: stdout[0].trim()};
    });
};
