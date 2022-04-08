import subprocess
import time

def single_vm_benchmark():
    with open('results.txt','w') as out_file:
        install_tools(out_file)
        
        specs(out_file)

        io_benchmark(5, out_file)
        cpu_benchmark(5, out_file)
        iops_benchmark(5, out_file)
        memory_benchmark(5, out_file)
        disk_benchmark(5, out_file)
        network_benchmark(5, out_file)


def io_benchmark(n_execs, out_file):
    write_to_file(out_file, 'Step 1 - IO Benchmark')
    for i in range(n_execs):
        run_and_save_cmd_res(out_file, 'dd if=/dev/zero of=sb-io-test bs=1M count=1k conv=fdatasync')

def cpu_benchmark(n_execs, out_file):
    write_to_file(out_file, 'Step 2 - CPU Benchmark')
    for i in range(n_execs):
        # FLAC test encoding
        # https://openbenchmarking.org/test/pts/encode-flac
        run_and_save_cmd_res(out_file, 'phoronix-test-suite benchmark pts/encode-flac')

        

def iops_benchmark(n_execs, out_file):
    write_to_file(out_file, "Step 3 - IOPS Benchmark")
    for i in range(n_execs):
        #M4.large
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 4 -r 2 -u root:root')
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 3975 -r 1987 -u root:root')

        #C4.xlarge
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 4 -r 2 -u root:root')
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 3723 -r 1861 -u root:root')

        #C5.xlarge
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 4 -r 2 -u root:root')
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 3800 -r 1900 -u root:root')

        #m5.xlarge
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 4 -r 2 -u root:root')
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 7776 -r 3888 -u root:root')

        #T2.2xlarge
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 4 -r 2 -u root:root')
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 16071 -r 8035 -u root:root')

        #T2.xlarge
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 4 -r 2 -u root:root')
        #run_and_save_cmd_res(out_file, 'sudo bonnie++ -d /dev/ -s 8007 -r 4003 -u root:root')

        #average_command 
        run_and_save_cmd_res_bonnie(out_file, 'sudo bonnie++ -d /dev/ -s 3614 -r 1807 -u root:root')        

#This command allow us to start 2 workers continuously calling mmap/munmap and writing to the allocated memory. and
#use mmap 1 Gbytes per vm worker,
def memory_benchmark(n_execs, out_file):
    write_to_file(out_file, "Step 4 - Memory Benchmark")
    for i in range(n_execs):
        run_and_save_cmd_res(out_file, 'stress-ng --vm 2 --vm-bytes 1G --timeout 60s --metrics-brief')

        
#for this command it's depend on disk name so for that we run first command df to list all disk name
def disk_benchmark(n_execs, out_file):
    write_to_file(out_file, "Step 5 - Disk Benchmark")
    for i in range(n_execs):
        # From https://doc.ubuntu-fr.org/hdparm and https://bit.ly/2GEYtLp
        # May be consider latency
        run_and_save_cmd_res(out_file, 'sudo hdparm -Tt /dev/xvda1')

def network_benchmark(n_execs, out_file):
    write_to_file(out_file, "Step 6 - Network Benchmark")
    for i in range(n_execs):
        run_and_save_cmd_res(out_file, 'speedtest-cli')


#Allow us to get caracteritics of each machine
def specs(out_file):
    write_to_file(out_file, "Step 0 - System Specs")
    run_and_save_cmd_res(out_file, 'lscpu')
    run_and_save_cmd_res(out_file, 'free -m')


def install_tools(out_file):
    run_and_save_cmd_res(out_file, 'sudo apt-get update -y')
    run_and_save_cmd_res(out_file, 'sudo snap install stress-ng')
    run_and_save_cmd_res(out_file, 'sudo apt install -y speedtest-cli')
    run_and_save_cmd_res(out_file, 'sudo apt-get install -y phoronix-test-suite')
    run_and_save_cmd_res(out_file, 'sudo apt-get install -y bonnie++')
    run_and_save_cmd_res(out_file, 'sudo apt-get install -y hdparm')

    # More installs for encode flac
    run_and_save_cmd_res(out_file, 'sudo apt install -y zip unzip php-zip')
    run_and_save_cmd_res(out_file, 'echo 3 | phoronix-test-suite install pts/encode-flac')

def run_and_save_cmd_res(out_file, cmd):
    result = subprocess.check_output(cmd.split(' ')).decode('UTF-8', 'ignore')
    print(result)
    print(result, file=out_file)

def write_to_file(out_file, content):
    print(content, end='\n')
    print(content, file=out_file)

if __name__ == '__main__':
    single_vm_benchmark()

