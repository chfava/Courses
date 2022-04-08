## Solve Every Sudoku Puzzle

## See http://norvig.com/sudoku.html

## Throughout this program we have:
##   r is a row,    e.g. 'A'
##   c is a column, e.g. '3'
##   s is a square, e.g. 'A3'
##   d is a digit,  e.g. '9'
##   u is a unit,   e.g. ['A1','B1','C1','D1','E1','F1','G1','H1','I1']
##   grid is a grid,e.g. 81 non-blank chars, e.g. starting with '.18...7...
##   values is a dict of possible values, e.g. {'A1':'12349', 'A2':'8', ...}


import math


def cross(A, B):
    "Cross product of elements in A and elements in B."
    return [a+b for a in A for b in B]


digits   = '123456789'
rows     = 'ABCDEFGHI'
cols     = digits
squares  = cross(rows, cols)
#print(squares)
unitlist = ([cross(rows, c) for c in cols] +
            [cross(r, cols) for r in rows] +
            [cross(rs, cs) for rs in ('ABC','DEF','GHI') for cs in ('123','456','789')])
units = dict((s, [u for u in unitlist if s in u])
             for s in squares)
peers = dict((s, set(sum(units[s],[]))-set([s]))
             for s in squares)

hm = [0,0]
all_hm = []

peers_box = dict((s, set(units[s][2])-set([s]))
             for s in squares)
unitlist_box = ([cross(rs, cs) for rs in ('ABC','DEF','GHI') for cs in ('123','456','789')])
units_box = dict((s, [u for u in unitlist_box if s in u])
             for s in squares)


#print(units_box)

################ Unit Tests ################

def test():
    "A set of tests that must pass."
    assert len(squares) == 81
    assert len(unitlist) == 27
    assert all(len(units[s]) == 3 for s in squares)
    assert all(len(peers[s]) == 20 for s in squares)
    assert units['C2'] == [['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
                           ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
                           ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']]
    assert peers['C2'] == set(['A2', 'B2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2',
                               'C1', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9',
                               'A1', 'A3', 'B1', 'B3'])
    print ('All tests pass.')

################ Parse a Grid ################

def parse_grid(grid):
    """Convert grid to a dict of possible values, {square: digits}, or
    return False if a contradiction is detected."""
    ## To start, every square can be any digit; then assign values from the grid.
    values = dict((s, digits) for s in squares)
    for s,d in grid_values(grid).items():
        if d in digits and not assign(values, s, d):
            return False ## (Fail if we can't assign d to square s.)

    #Frozen values are the values initially given (the grid to solve)
    global frozenValues 
    frozenValues = dict((s, '') for s in squares)
    frozenGrid = grid_values(grid).items()
    for s,d in frozenGrid:
        if d in digits:
            frozenValues[s] = d
    return values

def grid_values(grid):
    "Convert grid into a dict of {square: char} with '0' or '.' for empties."
    chars = [c for c in grid if c in digits or c in '0.']
    assert len(chars) == 81
    return dict(zip(squares, chars))

################ Constraint Propagation ################

def nakedPair(values, s):
    def generate_linked_np(s):
        g1 = [s[0]+str(i) for i in list(digits)]
        g1.remove(s)
        g2 = [i+s[1] for i in list(rows)]
        g2.remove(s)
        return [g1,g2]

    def check_pairs(values,s,l):
        m_vals = [t for t in l if values[t] == values[s]]
        if len(m_vals) == 1:
            for k in l:
                values[k] = "".join([e for e in values[k] if not e in values[s]])
        return values
    l = generate_linked_np(s)
    new_values = check_pairs(values,s,l[0])
    new_values = check_pairs(new_values,s,l[1])
    return new_values


def assign(values, s, d):
    """Eliminate all the other values (except d) from values[s] and propagate.
    Return values, except return False if a contradiction is detected."""
    global hm
    other_values = values[s].replace(d, '')
    if all(eliminate(values, s, d2) for d2 in other_values):
        hm[0] = hm[0] + 1
        return values
    else:
        hm[1] = hm[1] + 1
        return False

def eliminate(values, s, d):
    """Eliminate d from values[s]; propagate when values or places <= 2.
    Return values, except return False if a contradiction is detected."""
    if d not in values[s]:
        return values ## Already eliminated
    values[s] = values[s].replace(d,'')
    ## (1) If a square s is reduced to one value d2, then eliminate d2 from the peers.
    if len(values[s]) == 0:
        return False ## Contradiction: removed last value
    elif len(values[s]) == 1:
        d2 = values[s]
        if not all(eliminate(values, s2, d2) for s2 in peers[s]):
            return False
    ## (2) If a unit u is reduced to only one place for a value d, then put it there.
    for u in units[s]:
        dplaces = [s for s in u if d in values[s]]
        if len(dplaces) == 0:
            return False ## Contradiction: no place for this value
        elif len(dplaces) == 1:
            # d can only be in one place in unit; assign it there
            if not assign(values, dplaces[0], d):
                return False

    ## Commenter ou decommenter la ligne suivante pour controler l'heuristique naked pairs.
    #values = nakedPair(values, s)
    return values



################ Display as 2-D grid ################

def display(values):
    "Display these values as a 2-D grid."
    width = 1+max(len(values[s]) for s in squares)
    line = '+'.join(['-'*(width*3)]*3)
    for r in rows:
        print (list(''.join(values[r+c].center(width)+('|' if c in '36' else ''))
                      for c in cols))
        if r in 'CF': print(line)
    print('\n')
    print('\n')
        
def display2(values):
    "Display these values as a 2-D grid."
    width = 1+max(len(values[s]) for s in squares)
    line = ""
    keys = values.keys()
    keys.sort()
    for k in keys:
        v = values[k]
        line = line + str(v)
        if (k[1] == '9'):
            print(line)
            line = ""

################ Search ################


def solve(grid):
    ## Choisir l'algo a utiliser ci dessous 

    # return search(parse_grid(grid))
    return searchHillClimbing(parse_grid(grid))

def search(values):
    "Using depth-first search and propagation, try all possible values."
    if values is False:
        return False ## Failed earlier
    if all(len(values[s]) == 1 for s in squares):
        display(values)
        return values ## Solved!
    ## Chose the unfilled square s with the fewest possibilities
    ## Garder une des deux prochaines ligne! 
    
    # Choisi la case avec la quantite minimale de possibilites.
    n,s = min((len(values[s]), s) for s in squares if len(values[s]) > 1)
    # Choisi la case en ordre d'index.
    # n,s = [(len(values[s]), s) for s in squares if len(values[s]) > 1][0]
    return some(search(assign(values.copy(), s, d))
                for d in values[s])

################ Hill Climbing Search ################

def searchHillClimbing(values):
    "Using Hill Climbing search"

    #Initialize 3x3 boxes

    for s in squares :
        if(len(values[s]) > 1):
            d = values[s][0]
            newValues = assign_hill_climb(values, s, d)
            counter = 1
            while newValues == False and counter < len(values[s]):
                d = values[s][counter]
                newValues = assign_hill_climb(values, s, d)
    
    valuesNeeded = set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

    for s in squares :
        if values[s] == "":
            valuesInBox = []
            for i in units_box[s][0]:
                valuesInBox.append(values[i])
            valueMissing = list(valuesNeeded - set(valuesInBox))[0]
            values[s] = valueMissing

    #display(newValues)

    #calculate conflicts for lines and columns
    conflicts_rows, conflicts_columns = calculateConflicts(values)

    counter = 0
    while not solved(values) and counter < 10000:
        
        row1, col1, row2, col2 = chooseValuesToSwap(conflicts_rows, conflicts_columns)
        if row1 == None:
            return values
        val1 = rows[row1] + cols[col1]
        val2 = rows[row2] + cols[col2]
        #Swap numbers in each box to reduce conflicts between lines and columns
        values = swap(values, val1, val2)
        conflicts_rows, conflicts_columns = calculateConflicts(values)
        counter += 1
        #display(values)
    return values




def chooseValuesToSwap(conflicts_rows, conflicts_columns):
    
    row1 = sorted(enumerate(conflicts_rows), key=lambda x:x[1])[-1][0]
    col1 = sorted(enumerate(conflicts_columns), key=lambda x:x[1])[-1][0] 

    row2 = sorted(enumerate(conflicts_rows), key=lambda x:x[1])[-2][0] 
    col2 = sorted(enumerate(conflicts_columns), key=lambda x:x[1])[-2][0]

    counter = 0
    switch = False
    while isValueFrozen(row1, col1) or areValuesInSameBox(rows[row1] + cols[col1], rows[row2] + cols[col2]) == False:
        counter += 1
        if counter + 1 == len(conflicts_rows) - 1:
            return None, None, None, None
        if switch == False:
            row1 = sorted(enumerate(conflicts_rows), key=lambda x:x[1])[-1-counter][0]
            switch = True
        else:
            col2 = sorted(enumerate(conflicts_columns), key=lambda x:x[1])[-1-counter][0]
            switch = False

    return row1, col1, row2, col2
    

def isValueFrozen(row1, col1):
    if frozenValues[rows[row1] + cols[col1]] == "":
        return False
    else:
        return True

def areValuesInSameBox(value1, value2):
    for box in unitlist_box:
        if value1 in box:
            if(value2 in box):
                return True
            else:
                return False

def swap(values, val1, val2):
    temp = values[val1]
    values[val1] = values[val2]
    values[val2] = temp
    return values

def calculateConflicts(values, conflicts_rows = None, conflicts_columns = None, row1 = None, row2= None, col1= None, col2= None):
    if(conflicts_rows == None and conflicts_columns == None):
        conflicts_rows = []
        conflicts_columns = []

    valuesNeeded = set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

    if row1 == None and  row2 == None and col1 == None and col2 == None:
        for r in rows:
            conflicts_rows.append(len(valuesNeeded - set(list(''.join(values[r+c]) for c in cols))))

        for c in cols:
            conflicts_columns.append(len(valuesNeeded - set(list(''.join(values[r+c]) for r in rows))))

    else:
        conflicts_rows[row1] = len(valuesNeeded - set(list(''.join(values[rows[row1]+c]) for c in cols)))
        conflicts_rows[row2] = len(valuesNeeded - set(list(''.join(values[rows[row2]+c]) for c in cols)))

        conflicts_columns[col1] = len(valuesNeeded - set(list(''.join(values[r+cols[col1]]) for r in rows)))
        conflicts_columns[col2] = len(valuesNeeded - set(list(''.join(values[r+cols[col2]]) for r in rows)))

    return conflicts_rows, conflicts_columns


def assign_hill_climb(values, s, d):
    """Eliminate all the other values (except d) from values[s] and propagate.
    Return values, except return False if a contradiction is detected."""
    other_values = values[s].replace(d, '')
    if all(eliminate_hill_climb(values, s, d2) for d2 in other_values):
        return values
    else:
        return False

def eliminate_hill_climb(values, s, d):
    """Eliminate d from values[s]; propagate when values or places <= 2.
    Return values, except return False if a contradiction is detected."""
    if d not in values[s]:
        return values ## Already eliminated
    #if len(values[s]) != 1:
    values[s] = values[s].replace(d,'')
    ## (1) If a square s is reduced to one value d2, then eliminate d2 from the peers.
    if len(values[s]) == 0:
        return False ## Contradiction: removed last value
    elif len(values[s]) == 1:
        d2 = values[s]
        if not all(eliminate_hill_climb(values, s2, d2) for s2 in peers_box[s]):
            return False
    '''
    ## (2) If a unit u is reduced to only one place for a value d, then put it there.
    for u in units_box[s]:
        dplaces = [s for s in u if d in values[s]]
        if len(dplaces) == 0:
            return False ## Contradiction: no place for this value
        elif len(dplaces) == 1:
            # d can only be in one place in unit; assign it there
            if not assign_hill_climb(values, dplaces[0], d):
                return False
    '''
    return values



################ Simulated Annealing Search ################

def searchSimulatedAnnealing(values):
    "Using Simulated Annealing search"

    #Initialize 3x3 boxes

    for s in squares :
        if(len(values[s]) > 1):
            d = values[s][0]
            newValues = assign_hill_climb(values, s, d)
            counter = 1
            while newValues == False and counter < len(values[s]):
                d = values[s][counter]
                newValues = assign_hill_climb(values, s, d)
    
    valuesNeeded = set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

    for s in squares :
        if values[s] == "":
            valuesInBox = []
            for i in units_box[s][0]:
                valuesInBox.append(values[i])
            valueMissing = list(valuesNeeded - set(valuesInBox))[0]
            values[s] = valueMissing

    #Initiate Temperature 

    #calculate conflicts for lines and columns
    conflicts_rows, conflicts_columns = calculateConflicts(values)

    for t in range(0, 1000):
        if solved(values):
            return values

        Temp = schedule(t)

        if Temp == 0 :
            return values

        row1, col1, row2, col2 = chooseValuesToSwapSimulatedAnnealing(conflicts_rows, conflicts_columns)
        if row1 == None:
            return values
        val1 = rows[row1] + cols[col1]
        val2 = rows[row2] + cols[col2]
        #Swap numbers in each box to reduce conflicts between lines and columns
        values = swap(values, val1, val2)
        conflicts_rows, conflicts_columns = calculateConflicts(values)
        #display(values)
        Temp -= 5 
    return values

def schedule(t):
    return 1000 - t

def chooseValuesToSwapSimulatedAnnealing(conflicts_rows, conflicts_columns, T):
    
    proba = math.exp()

    solutions = []

    for i, row in enumerate(conflicts_rows):
        row1 = sorted(enumerate(conflicts_rows), key=lambda x:x[1])[i][0]
        for j, col in enumerate(conflicts_columns):
            col1 = sorted(enumerate(conflicts_columns), key=lambda x:x[1])[j][0] 
            cost = sorted(enumerate(conflicts_rows), key=lambda x:x[1])[i][1] + sorted(enumerate(conflicts_columns), key=lambda x:x[1])[j][1]
            solutions.append(row1, col1, cost)
    
    match = []
    for i, sol1 in enumerate(solutions):
        for j, sol2 in enumerate(solutions):
            if i != j:
                match.append(sol1, sol2, sol1[2] + sol2[2])

    matchSorted = sorted(match, key=lambda x:x[2])

    counter = 0
    while isValueFrozen(row1, col1) or areValuesInSameBox(rows[row1] + cols[col1], rows[row2] + cols[col2]) == False:
        counter += 1
        if counter + 1 == len(match) - 1:
            return None, None, None, None
        
        match = matchSorted[-1 - counter]
        proba = math.exp(match[2] / T + 1)
        if proba > 0.5:
            match = matchSorted[1 + counter]
        row1 = match[0][0]
        col1 = match[0][1]
        row2 = match[1][0]
        col2 = match[1][1]
    return row1, col1, row2, col2




################ Utilities ################

def some(seq):
    "Return some element of seq that is true."
    for e in seq:
        if e: return e
    return False

def from_file(filename, sep='\n'):
    "Parse a file into a list of strings, separated by sep."
    return open(filename).read().strip().split(sep)

def shuffled(seq):
    "Return a randomly shuffled copy of the input sequence."
    seq = list(seq)
    random.shuffle(seq)
    return seq

################ System test ################

import time, random

def solve_all(grids, name='', showif=0.0):
    """Attempt to solve a sequence of grids. Report results.
    When showif is a number of seconds, display puzzles that take longer.
    When showif is None, don't display any puzzles."""
    def time_solve(grid):
        
        global hm
        global all_hm
        hm=[0,0]
        start = time.clock()
        values = solve(grid)
        t = time.clock()-start
        all_hm.append(float(hm[0])/(hm[0]+hm[1]))
        ## Display puzzles that take long enough
        if showif is not None and t > showif:
            display2(grid_values(grid))
            if values: display2(values)
            print ('(%.2f seconds)\n' % t)
        return (t, solved(values))
    times, results = zip(*[time_solve(grid) for grid in grids])
    N = len(grids)
    if N > 1:
        print ("Solved %d of %d %s puzzles (avg %.2f secs (%d Hz), max %.2f secs)." % (
            sum(results), N, name, sum(times)/N, N/sum(times), max(times)))
    global all_hm
    # print("Average hit ratio: ",sum(all_hm)/len(all_hm))

def solved(values):
    "A puzzle is solved if each unit is a permutation of the digits 1 to 9."
    def unitsolved(unit): return set(values[s] for s in unit) == set(digits)
    return values is not False and all(unitsolved(unit) for unit in unitlist)

def random_puzzle(N=17):
    """Make a random puzzle with N or more assignments. Restart on contradictions.
    Note the resulting puzzle is not guaranteed to be solvable, but empirically
    about 99.8% of them are solvable. Some have multiple solutions."""
    values = dict((s, digits) for s in squares)
    for s in shuffled(squares):
        if not assign(values, s, random.choice(values[s])):
            break
        ds = [values[s] for s in squares if len(values[s]) == 1]
        if len(ds) >= N and len(set(ds)) >= 8:
            return ''.join(values[s] if len(values[s])==1 else '.' for s in squares)
    return random_puzzle(N) ## Give up and make a new puzzle

grid1  = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
grid2  = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......'
hard1  = '.....6....59.....82....8....45........3........6..3.54...325..6..................'
    
if __name__ == '__main__':
    test()
    
    # solve_all(from_file("onesudo.txt"), "hard", 0.0)
    
    solve_all(from_file("top95.txt"), "hard", None)

    
    # solve_all(from_file("1000sudoku.txt"), "1000sudoku", None)
    # solve_all(from_file("easy50.txt", '========'), "easy", None)
    # solve_all(from_file("easy50.txt", '========'), "easy", None)
    # solve_all(from_file("hardest.txt"), "hardest", None)
    # solve_all([random_puzzle() for _ in range(99)], "random", 100.0)

## References used:
## http://www.scanraid.com/BasicStrategies.htm
## http://www.sudokudragon.com/sudokustrategy.htm
## http://www.krazydad.com/blog/2005/09/29/an-index-of-sudoku-strategies/
## http://www2.warwick.ac.uk/fac/sci/moac/currentstudents/peter_cock/python/sudoku/
